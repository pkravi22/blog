import React, { useState, useEffect } from "react";
import axios from "axios";

const Bytes = () => {
  const [file, setFile] = useState(null); // Single file for upload
  const [uploadedFiles, setUploadedFiles] = useState([]); // List of uploaded files

  // Handle file selection
  const handleChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
  };

  // Handle file upload
  const handleUpload = async () => {
    console.log("Uploading file:");
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Add file to FormData

    try {
      const response = await axios.post("http://localhost:5000/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);

      // Refresh the uploaded files list
      fetchUploadedFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Fetch uploaded files from the backend
  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("https://blog-ung5.onrender.com/bytes");
      setUploadedFiles(response.data); // Assuming the response contains the file list
      console.log(uploadedFiles);
      console.log(uploadedFiles[9].filePath)
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Fetch files on component mount
  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  return (
    <div className="min-h-screen pt-24 flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col gap-2">
        <input type="file" onChange={handleChange} />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      <div className="mt-8 w-full">
        <h2 className="text-xl font-bold mb-4">Uploaded Files</h2>
        {uploadedFiles.length > 0 ? (
          <ul className="grid grid-cols-4 gap-4">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="mb-2 list-none">
                <img key={file._id} src={`http://localhost:5000/${file.filePath}`} alt={file.fileName} width="200px" />
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default Bytes;
