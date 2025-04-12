import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String, // For now, keep plain text if no hashing
  name: String,
});

export const Admin = mongoose.model('Admin', AdminSchema);
