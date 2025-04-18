import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String, 
  name: String,
});

export const Admin = mongoose.model('Admin', AdminSchema);
