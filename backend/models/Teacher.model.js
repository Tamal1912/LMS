import mongoose from "mongoose";
import bcrypt from "bcrypt";
const teacherSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "teacher" },
  phone: { type: String },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  enrolledStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  refreshToken: { type: String}
}, {timestamps:true});

// Hash password before saving
teacherSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

//Method to check password
teacherSchema.methods.checkPassword=async function(password){
  return await bcrypt.compare(password,this.password);
}

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
