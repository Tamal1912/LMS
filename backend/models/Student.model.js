import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import mongooseSequence from 'mongoose-sequence';

// Pass mongoose explicitly to the mongoose-sequence plugin
const autoIncrement = mongooseSequence(mongoose);

const studentSchema = new mongoose.Schema({
  studentId: { type: Number, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  refreshToken: { type: String },
  phone: { type: String },
  yearJoined: { type: String },
  program: { type: String },
}, { timestamps: true });

// Apply mongoose-sequence to the student schema
studentSchema.plugin(autoIncrement, { inc_field: 'studentId' });

// Hash password before saving
studentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check password
studentSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Student = mongoose.model('Student', studentSchema);
export default Student;
