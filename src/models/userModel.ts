import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique:true
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

// next Js runs on edge. First it check if model is already exists if not
// then it creates new model
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User


