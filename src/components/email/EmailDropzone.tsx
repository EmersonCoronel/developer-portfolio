import React, { useState } from "react";

const EmailDropzone: React.FC<{ onFileContent: (content: string) => void }> = ({ onFileContent }) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.eml')) {
      setError("Please select a .eml file. To get a .eml file from your Mail app, drag the email to your desktop or save it as a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onFileContent(reader.result as string);
    reader.onerror = () => setError("Failed to read file.");
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    setError(null);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    } else {
      setError("Please drop a .eml file. To get a .eml file from your Mail app, drag the email to your desktop or save it as a file first.");
    }
  };

  const dropzoneStyle = {
    border: dragging ? "3px dashed rgba(255, 255, 255, 0.6)" : "3px dashed rgba(255, 255, 255, 0.3)",
    padding: "40px",
    textAlign: "center" as const,
    borderRadius: "8px",
    color: dragging ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.7)",
    cursor: "pointer",
    userSelect: "none" as const,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease",
  };

  const buttonStyle = {
    display: "inline-block",
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    userSelect: "none" as const,
    fontSize: "1rem",
    transition: "all 0.3s ease",
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); if (!dragging) setDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragging(false); }}
      onDrop={handleDrop}
      style={dropzoneStyle}
    >
      <p style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>Drag and drop your .eml file here</p>
      <p style={{ margin: "0", fontSize: "1rem", opacity: "0.8" }}>or click to select a file</p>
      <p style={{ margin: "0", fontSize: "0.9rem", opacity: "0.6" }}>To get a .eml file from Apple Mail: drag the email to your desktop or save it as a file first</p>
      
      <input
        type="file"
        accept=".eml"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        id="file-upload"
      />
      
      <label
        htmlFor="file-upload"
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
          e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
        }}
      >
        Browse Files
      </label>
      
      {error && <p style={{ color: "#ff4444", margin: "10px 0 0 0" }}>{error}</p>}
    </div>
  );
};

export default EmailDropzone;
