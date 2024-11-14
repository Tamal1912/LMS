const express = require('express');
const Credential = require('../models/Credential');
const { uploadToIPFS, storeHashOnBlockchain } = require('../blockchain/blockchain');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware('teacher'), async (req, res) => {
  const { studentId, fileBuffer } = req.body;

  const ipfsHash = await uploadToIPFS(fileBuffer);
  const blockchainHash = await storeHashOnBlockchain(studentId, ipfsHash);

  const credential = new Credential({ studentId, ipfsHash, blockchainHash });
  await credential.save();

  res.status(201).json({ message: 'Credential uploaded and stored on blockchain' });
});

router.get('/verify/:studentId', authMiddleware(), async (req, res) => {
  const { studentId } = req.params;
  const credential = await Credential.findOne({ studentId, status: 'valid' });

  if (!credential) return res.status(404).json({ message: 'Credential not found or revoked' });
  res.json({ valid: true, credential });
});

module.exports = router;
