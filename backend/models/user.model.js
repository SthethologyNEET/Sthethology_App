import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    mobileNo: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    studyingFor: {
        type: String,
        required: true,
        enum: ["XI", "XII", "Dropper"]
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;