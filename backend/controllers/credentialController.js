import Credential from '../models/Credential.model.js';
import { uploadToIPFS, storeHashOnBlockchain, verifyCredentialOnBlockchain } from '../blockchain/blockchain.js';

// POST /api/credential/upload
export const upload = async (req, res) => {
  try {
    const { studentId, fileBuffer } = req.body;

    if (!studentId || !fileBuffer) {
      return res.status(400).json({ message: 'studentId and fileBuffer are required' });
    }

    // Upload to IPFS
    const ipfsHash = await uploadToIPFS(fileBuffer); // This should return the CID

    // Store the hash on the blockchain
    const blockchainHash = await storeHashOnBlockchain(studentId, ipfsHash);

    // Save the credential in DB
    const credential = new Credential({
      studentId,
      ipfsHash,
      blockchainHash,
    });
    await credential.save();

    res.status(201).json({
      message: 'Credential uploaded and stored on blockchain',
      credential,
    });
  } catch (error) {
    console.error('Error in /upload route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/credential/verify/:studentId
export const verify = async (req, res) => {
  try {
    const { studentId } = req.params;

    const credential = await Credential.findOne({ studentId, status: 'valid' });

    if (!credential) {
      return res.status(404).json({ message: 'Credential not found or revoked' });
    }

    const isValidOnBlockchain = await verifyCredentialOnBlockchain(studentId, credential.ipfsHash);

    if (isValidOnBlockchain) {
      res.json({ valid: true, credential });
    } else {
      res.status(404).json({ message: 'Credential is not valid on blockchain' });
    }
  } catch (error) {
    console.error('Error in /verify route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
