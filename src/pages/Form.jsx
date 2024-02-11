import React from "react";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRegisterNumberChange = (e) => {
    setRegisterNumber(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!name || !registerNumber || !selectedFile) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("registerNumber", registerNumber);
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "https://tecazine-server.onrender.com/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("File uploaded successfully.");
        setLoading(false);
        setName("");
        setRegisterNumber("");
        setSelectedFile(null);
      } else {
        alert("Error uploading file.");
      }
    } catch (error) {
      console.error("Error uploading file:", error.message);
      alert("An error occurred while uploading the file.");
    }
  };
  return (
    <div className="h-screen w-screen flex sm:justify-center sm:items-center sm:p-9 font-poppins  pt-40 ">
      <div className="p-3 sm:p-8 sm:border-2  border-purple-700 rounded-lg">
        <h1 className="font-bold text-3xl">Tecazine</h1>
        <p className="my-3">Submit your response : </p>
        <form className="flex flex-col gap-2">
          <label>Name </label>
          <input
            value={name}
            onChange={handleNameChange}
            type="text"
            placeholder="Name"
            className="focus:outline-purple-700 px-3 py-2 border-2"
          />
          <label>Register Number</label>
          <input
            value={registerNumber}
            onChange={handleRegisterNumberChange}
            type="text"
            placeholder="Register number"
            className="focus:outline-purple-700 px-3 py-2 border-2 "
          />

          <label>Choose a file:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <br />
          <button
            onClick={handleUpload}
            className="bg-purple-700 px-3 py-2 rounded-lg text-white font-semibold "
          >
            Upload File
          </button>
          {loading && <p>Submitting...</p>}
        </form>
      </div>
    </div>
  );
};

export default Form;
