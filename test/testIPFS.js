// testIPFS.js
const { create } = require('ipfs-http-client');
require('dotenv').config();

// Initialize IPFS client using Infura or any IPFS gateway
const ipfs = create({ url: process.env.IPFS_API_URL });

// Function to upload a file to IPFS
async function uploadToIPFS(content) {
  try {
    const { path } = await ipfs.add(content);
    console.log("IPFS Hash (CID):", path); // IPFS hash for the uploaded content
    return path;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
  }
}


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

// Test the IPFS upload and retrieval
async function testIPFS() {
  const content = "This is a test file for IPFS"; // Content to upload
  const hash = await uploadToIPFS(content); // Upload to IPFS

  if (hash) {
    console.log("Upload successful. Hash:", hash);
    await getFromIPFS(hash); // Retrieve from IPFS
  }
}

testIPFS();
