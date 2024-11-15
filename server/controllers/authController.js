import bcryptjs from 'bcryptjs';
import {User} from '../models/userModel.js'; // Adjust the import based on your file structure
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    // Validate required fields
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    // console.log("User Already Exists",userAlreadyExists);
    
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash the password and generate verification token
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(10000 + Math.random() * 90000).toString();

    // Create and save the new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiredAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    await user.save();

    //jwt token
    generateTokenAndSetCookie(res,user._id);

    await sendVerificationEmail(User.email,verificationToken);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })

  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res, next) => {
  res.send("login route");
};

export const logout = async (req, res, next) => {
  res.send("logout route");
};
