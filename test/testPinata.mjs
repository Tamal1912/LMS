import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';

// Load environment variables from .env file
dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;

// Function to upload a file to Pinata
const uploadToPinata = async (filePath) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  try {
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath)); // Attach file to form-data

    const response = await axios.post(url, data, {
      headers: {
        ...data.getHeaders(), // Add multipart form headers
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    });

    console.log('File uploaded successfully! CID:', response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error.response?.data || error.message);
  }
};

// Function to retrieve data from IPFS
const getFromIPFS = async (cid) => {
  try {
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    console.log('Retrieving from URL:', url);

    const response = await axios.get(url);
    console.log('Retrieved Content:', response.data);
  } catch (error) {
    console.error('Error retrieving from IPFS:', error.message);
  }
};

// Test the integration
const testPinata = async () => {
  const filePath = './hello.txt'; // Path to your test file
  const cid = await uploadToPinata(filePath);

  if (cid) {
    await getFromIPFS(cid);
  }
};

testPinata();
