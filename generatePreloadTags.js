const fs = require('fs');
const path = require('path');

const imageDir = './public/images';
const indexPath = './public/index.html';

// Function to recursively get all image files in the directory and its subdirectories
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fileList = getAllImageFiles(filePath, fileList);
    } else if (/\.(png|jpg|jpeg|gif|svg)$/.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const imageFiles = getAllImageFiles(imageDir);

const preloadTags = imageFiles
  .map(file => {
    const relativePath = path.relative('./public', file).replace(/\\/g, '/');
    return `    <link rel="preload" href="/${relativePath}" as="image">`;
  })
  .join('\n');

// Read the index.html file
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    return console.error('Unable to read index.html:', err);
  }

  // Insert preload tags into the head section
  const updatedIndex = data.replace(
    /(<head>)/,
    `$1\n${preloadTags}`
  );

  // Write the updated content back to index.html
  fs.writeFile(indexPath, updatedIndex, 'utf8', err => {
    if (err) {
      return console.error('Unable to write to index.html:', err);
    }
    console.log('Preload tags successfully added to index.html');
  });
});
