import Credential from '../models/Credential.model.js';
import Student from '../models/Student.model.js'; // 👈 This is new
import { uploadToIPFS, storeHashOnBlockchain, verifyCredentialOnBlockchain } from '../blockchain/blockchain.js';

// POST /api/credential/upload
export const upload = async (req, res) => {
  try {
    const { studentId } = req.body;
    const file = req.files?.file; // Use 'file' as the key in form-data

    if (!studentId || !file) {
      return res.status(400).json({ message: 'studentId and file are required' });
    }

    // Upload to IPFS using the file buffer (from form-data)
    const ipfsHash = await uploadToIPFS(file.data); // This sends the file buffer to IPFS

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
    // Ensure studentId is treated as a number
    const studentId = Number(req.params.studentId);

    // If the studentId is not a valid number, return an error
    if (isNaN(studentId)) {
      return res.status(400).json({ message: 'Invalid studentId' });
    }

    const credential = await Credential.findOne({ studentId, status: 'valid' });

    if (!credential) {
      return res.status(404).json({ message: 'Credential not found or revoked' });
    }

    const isValidOnBlockchain = await verifyCredentialOnBlockchain(studentId, credential.ipfsHash);

    if (isValidOnBlockchain) {
      // 🧠 Update student.isVerified = true
      await Student.findOneAndUpdate(
        { studentId },
        { isVerified: true },
        { new: true }
      );

      return res.json({ valid: true, credential });
    } else {
     
      await Student.findOneAndUpdate(
        { studentId },
        { isVerified: false },
        { new: true }
      );

      return res.status(200).json({ valid: false, message: 'Credential is not valid on blockchain' });
    }
  } catch (error) {
    console.error('Error in /verify route:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
