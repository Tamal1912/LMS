import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Course from "./Course.model.js";
import Student from "./Student.model.js";
const teacherSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "teacher" },
  phone: { type: String },
  courseCreated:{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Course"
  },
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
