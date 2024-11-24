// testIPFS.mjs
import { create } from 'ipfs-http-client';
import dotenv from 'dotenv';

dotenv.config();

// Initialize IPFS client using your API URL
const ipfs = create({ url: process.env.IPFS_API_URL });

// Function to upload content to IPFS
async function uploadToIPFS(content) {
  try {
    const { path } = await ipfs.add(content);
    console.log("IPFS Hash (CID):", path);
    return path;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
  }
}

// Function to retrieve content from IPFS
async function getFromIPFS(hash) {
  try {
    const chunks = [];
    for await (const chunk of ipfs.cat(hash)) {
      chunks.push(chunk);
    }
    const content = Buffer.concat(chunks).toString();
    console.log("Retrieved Content:", content);
    return content;
  } catch (error) {
    console.error("Error retrieving from IPFS:", error);
  }
}

// Test function for IPFS upload and retrieval
async function testIPFS() {
  const content = "This is a test file for IPFS";
  const hash = await uploadToIPFS(content);

  if (hash) {
    console.log("Upload successful. Hash:", hash);
    await getFromIPFS(hash);
  }
}

testIPFS();
