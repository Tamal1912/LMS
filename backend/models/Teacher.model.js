import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Course from "./Course.model.js";

const teacherSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "teacher" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
}, {timestamps:true});

// Hash password before saving
teacherSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate JWT token
teacherSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    "your_jwt_secret_key",
    { expiresIn: "1h" }
  );
  return token;
};

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
