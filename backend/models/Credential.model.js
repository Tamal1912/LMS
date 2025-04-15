import mongoose from 'mongoose';

const credentialSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  ipfsHash: String,
  blockchainHash: String,
  issueDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['valid', 'revoked'], default: 'valid' }
});

const Credential = mongoose.model('Credential', credentialSchema);

export default Credential;
