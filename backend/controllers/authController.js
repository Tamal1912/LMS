const Student = require('../models/Student.model.js');
const Teacher = require('../models/Teacher.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {ApiError}=require("../utils/ApiError.js");
const {ApiResponse} =require("../utils/ApiResponses.js");
const {asyncHandler}= require("../utils/asyncHandler.js")

// Student Login
const studentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
      throw new ApiError(400, "Email and Password are required");
  }

  // Find user by email
  const user = await Student.findOne({ email });

  if (!user) {
      throw new ApiError(404, "User not found");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expiration time
  });

  // Send response with token
  res.status(200).json(
      new ApiResponse(200, { token, username: user.username, email: user.email }, "Login successful")
  );
});

// Student Sign-Up
const studentSignUp =asyncHandler(async (req, res) => {
 
  const {username,password,email}=req.body;


  if ([username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(409, "Fill all the fields");
}

  let existedStudent=await Student.findOne({
      $or:[{ username },{ email }]
  })

  if(existedStudent){
   throw new ApiError(400, "User already exist");
  }
  

  const user=await Student.create({
      username,
      password,
      email,
  })

  const createdUser=await Student.findById(user._id).select(
      "-password -refreshToken"
  )
  
  if(!createdUser){
      throw new ApiError(500, "internal server error");
  }

  res.status(200).json(
      new ApiResponse(201,createdUser,"user Succesfully registred")
  )
}

);

// Teacher Login
const teacherLogin =  asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
      throw new ApiError(400, "Email and Password are required");
  }

  // Find user by email
  const user = await Teacher.findOne({ email });

  if (!user) {
      throw new ApiError(404, "User not found");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
  }

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expiration time
  });

  // Send response with token
  res.status(200).json(
      new ApiResponse(200, { token, username: user.username, email: user.email }, "Login successful")
  );
});

// Teacher Sign-Up
const teacherSignUp = async (req, res) => {
  const {username,password,email}=req.body;


  if ([username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(409, "Fill all the fields");
}

  let existedTeacher=await Teacher.findOne({
      $or:[{ username },{ email }]
  })

  if(existedTeacher){
   throw new ApiError(400, "User already exist");
  }
  

  const user=await Teacher.create({
    username,
      password,
      email,
  })

  const createdUser=await Teacher.findById(user._id).select(
      "-password -refreshToken"
  )
  
  if(!createdUser){
      throw new ApiError(500, "internal server error");
  }

  res.status(200).json(
      new ApiResponse(201,createdUser,"user Succesfully registred")
  )
};

const logout = asyncHandler(async (req, res) => {
  // For cookie-based tokens
  res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
  });

  // Additional handling for token invalidation (if needed)
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
      // Optionally blacklist the token here
      console.log("Token invalidated:", token);
  }

  res.status(200).json(
    new ApiResponse(200, {},"Logged out")
  );
});

module.exports = { studentLogin, studentSignUp, teacherLogin , teacherSignUp, logout};
