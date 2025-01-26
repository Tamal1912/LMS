import jwt from "jsonwebtoken";

const generateAccessToken=(userId)=>{
    return jwt.sign({_id:userId},process.env.JWT_SECRET,{expiresIn:"40m"});
}

const generateRefreshToken=(userId)=>{
    return jwt.sign({_id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
}

export {generateAccessToken,generateRefreshToken};

