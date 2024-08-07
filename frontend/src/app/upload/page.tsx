// page.tsx
import React, { useState } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers';
import axios from 'axios';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const UploadDocuments: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file.');
      return;
    }

    // Generate hash of the file
    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer) {
        const buffer = Buffer.from(arrayBuffer);
        const fileHash = web3.utils.sha3(buffer.toString('hex'));
        setHash(fileHash);

        // Store file and hash in MongoDB
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('hash', fileHash);

          const response = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          setStatus(`File uploaded and hash stored: ${fileHash}`);
        } catch (error) {
          console.error('Error uploading file:', error);
          setStatus('Error uploading file.');
        }
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Upload
      </button>
      {status && <p className="mt-2">{status}</p>}
    </div>
  );
};

export default UploadDocuments;
