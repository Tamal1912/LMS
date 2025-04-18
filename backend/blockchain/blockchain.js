import Web3 from 'web3';
import dotenv from 'dotenv';
import axios from 'axios';
import FormData from 'form-data';
import { Readable } from 'stream';
import { createRequire } from 'module';

dotenv.config();

const require = createRequire(import.meta.url);
const contractABI = require('./abi.json');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.SEPOLIA_RPC));
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Upload file to IPFS (Pinata)
export const uploadToIPFS = async (base64Data) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const stream = Readable.from(buffer);

    const data = new FormData();
    data.append('file', stream, {
      filename: `credential-${Date.now()}.pdf`, // Arbitrary filename for Pinata
    });

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
    console.error('💥 Error uploading to IPFS:', error.response?.data || error.message);
    throw error;
  }
};

// Store hash on blockchain
export const storeHashOnBlockchain = async (studentAddress, ipfsHash) => {
  let rawKey = process.env.WALLET_PRIVATE_KEY;
  const privateKey = rawKey.startsWith('0x') ? rawKey : `0x${rawKey}`;

  // Validate private key format
  if (!web3.utils.isHexStrict(privateKey)) {
    console.error("❌ Private key is not a valid hex string!");
    throw new Error("Private key is not a valid hex string.");
  }

  // Derive the sender's address from the private key
  const senderAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;
  console.log("✅ Private Key is valid! Account Address:", senderAddress);

  try {
    const tx = contract.methods.storeCredentialHash(studentAddress, ipfsHash);
    const gas = await tx.estimateGas({ from: senderAddress });
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(senderAddress, 'latest');

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        from: senderAddress,
        to: contractAddress,
        data: tx.encodeABI(),
        gas,
        gasPrice,
        nonce,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("✅ Transaction successful! Tx Hash:", receipt.transactionHash);
    return receipt.transactionHash;
  } catch (error) {
    console.error('💥 Error storing hash on blockchain:', error.message || error);
    throw error;
  }
};

// Verify hash on blockchain
export const verifyCredentialOnBlockchain = async (studentAddress, ipfsHash) => {
  try {
    const isValid = await contract.methods.verifyCredential(studentAddress, ipfsHash).call();
    console.log(`🔍 Credential verification result: ${isValid}`);
    return isValid;
  } catch (error) {
    console.error('💥 Error verifying hash on blockchain:', error.message || error);
    throw error;
  }
};
