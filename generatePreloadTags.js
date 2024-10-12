const fs = require("fs");
const path = require("path");

const imageDir = "./public/images";
const indexPath = "./public/index.html";

// Function to recursively get all image files in the directory and its subdirectories
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fileList = getAllImageFiles(filePath, fileList);
    } else if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const imageFiles = getAllImageFiles(imageDir);

// Read the index.html file
fs.readFile(indexPath, "utf8", (err, data) => {
  if (err) {
    return console.error("Unable to read index.html:", err);
  }

  // Extract existing preload tags for images
  const existingPreloadHrefs = [];
  const preloadRegex = /<link\s+rel=["']preload["']\s+href=["']([^"']+)["']\s+as=["']image["']\s*\/?>/gi;
  let match;
  while ((match = preloadRegex.exec(data)) !== null) {
    existingPreloadHrefs.push(match[1]);
  }

  // Now, generate preload tags only for new images
  const newPreloadTags = imageFiles
    .map((file) => {
      const relativePath = path.relative("./public", file).replace(/\\/g, "/");
      const href = `/${relativePath}`;
      if (existingPreloadHrefs.includes(href)) {
        // Image is already preloaded; skip it
        return null;
      }
      // Else, generate a new preload tag
      return `    <link rel="preload" href="${href}" as="image">`;
    })
    .filter((tag) => tag !== null)
    .join("\n");

  if (newPreloadTags) {
    // Insert new preload tags into the head section, after existing preload tags
    const updatedIndex = data.replace(
      /(<\/head>)/i,
      `${newPreloadTags}\n$1`
    );

    // Write the updated content back to index.html
    fs.writeFile(indexPath, updatedIndex, "utf8", (err) => {
      if (err) {
        return console.error("Unable to write to index.html:", err);
      }
      console.log("New preload tags successfully added to index.html");
    });
  } else {
    console.log("No new preload tags to add.");
  }
});
