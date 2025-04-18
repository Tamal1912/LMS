import mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema({
  studentId: { type: Number, required: true, unique: true }, // switched from ObjectId to Number
  ipfsHash: String,
  blockchainHash: String,
  issueDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['valid', 'revoked'], default: 'valid' }
});

const Credential = mongoose.model('Credential', credentialSchema);

export default Credential;
