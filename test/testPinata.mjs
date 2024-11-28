import axios from 'axios';
import dotenv from 'dotenv';
import FormData from 'form-data';
import fs from 'fs';


dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_API_SECRET;


const uploadToPinata = async (filePath) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  try {
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath)); 

    const response = await axios.post(url, data, {
      headers: {
        ...data.getHeaders(), 
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

const testPinata = async () => {
  const filePath = './hello.txt'; 
  const cid = await uploadToPinata(filePath);

  if (cid) {
    await getFromIPFS(cid);
  }
};

testPinata();
