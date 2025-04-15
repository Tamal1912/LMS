import Web3 from 'web3';
import dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

import { createRequire } from 'module';
dotenv.config();

const require = createRequire(import.meta.url);
const contractABI = require('./abi.json');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.SEPOLIA_RPC));
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// ✅ Upload file to IPFS using Pinata
export const uploadToIPFS = async (filePath) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  try {
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    const response = await axios.post(url, data, {
      headers: {
        ...data.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    });

    console.log('File uploaded to IPFS. CID:', response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Store hash on blockchain
export const storeHashOnBlockchain = async (studentAddress, ipfsHash) => {
  const privateKey = process.env.WALLET_PRIVATE_KEY;
  const account = web3.eth.accounts.privateKeyToAccount(privateKey).address;

  try {
    const tx = contract.methods.storeCredentialHash(studentAddress, ipfsHash);
    const gas = await tx.estimateGas({ from: account });
    const gasPrice = await web3.eth.getGasPrice();

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        data: tx.encodeABI(),
        gas,
        gasPrice,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt.transactionHash;
  } catch (error) {
    console.error('Error storing hash on blockchain:', error);
    throw error;
  }
};

// ✅ Verify hash on blockchain
export const verifyCredentialOnBlockchain = async (studentAddress, ipfsHash) => {
  try {
    const isValid = await contract.methods.verifyCredential(studentAddress, ipfsHash).call();
    return isValid;
  } catch (error) {
    console.error('Error verifying hash on blockchain:', error);
    throw error;
  }
};
