import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import isValidPassword from "../utils/validatePassword.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, mobileNo, day, month, year, gender, studyingFor } = req.body;

        if (password != confirmPassword) {
            return res.status(400).json({ error: "Password do not match" });
        }
        if (!isValidPassword(password)) {
            return res.status(400).json({ error: "Password should be a combination of alphanumeric characters & must contain atleast one special character" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "Password should be atleast 6 characters long" });
        }
        if (mobileNo.length !== 10) {
            return res.status(400).json({ error: "Enter a valid mobile no." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "A user with this email already exists. Login to continue or try with a new email" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const dob = new Date(year, month - 1, day);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobileNo,
            dob: dob,
            gender,
            studyingFor
        });

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                mobileNo: newUser.mobileNo,
                dob: newUser.dob,
                gender: newUser.gender,
                studyingFor: newUser.studyingFor
            });
        } else {
            res.status(400).json({ error: "Invalid User Data" });
        }
    } catch (error) {
        console.log("Error in Signing up", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ error: "User not found!" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            mobileNo: user.mobileNo,
            dob: user.dob,
            gender: user.gender,
            studyingFor: user.studyingFor
        });
    } catch (error) {
        console.log("Error in Logging in", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({
            message: "logged out Successfully"
        });
    } catch (error) {
        console.log("Error in Logging out", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}