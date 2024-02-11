import React, { useState, useEffect } from "react";

const Viewer = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        "https://tecazine-server.onrender.com/documents"
      );
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error.message);
    }
  };

  const downloadDocument = (blobName) => {
    window.location.href = `https://tecazine-server.onrender.com/download/${encodeURIComponent(
      blobName
    )}`;
  };

  return (
    <div className="h-full w-screen flex flex-col p-5 ">
      <div className="">
        <h1 className="font-bold text-3xl  ">Tecazine Responses</h1>
        <ul className="mt-9 ">
          {documents.map((document) => (
            <li
              key={document}
              className="hover:bg-gray-300 p-3 m-2 rounded-md flex items-center"
            >
              <div className="px-9 w-1/2">{document} </div>
              <button
                onClick={() => downloadDocument(document)}
                className="bg-purple-600 px-3 py-2 text-white rounded-lg hover:bg-"
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Viewer;
