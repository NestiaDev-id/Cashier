import bcryptjs from 'bcryptjs';
import {User} from '../models/userModel.js'; // Adjust the import based on your file structure
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';

export const signup = async (req, res, next) => {
  const { email, password, name } = req.body;
  console.log("Register Request body:", req.body);


  try {
    // Validate required fields
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    
    if (userAlreadyExists) {
      console.log("User Already Exists",userAlreadyExists);
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

    // await sendVerificationEmail(User.email,verificationToken);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })

  } catch (error) {
    console.error("Error in signup", error.message);
    console.log("Error in signup", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {

}

export const login = async (req, res, next) => {
  const {email, password} = req.body;
  console.log("Login Request body:", req.body);


  try{
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ success: false, message:"User not found"});
    }
    const isPsswordValid = await bcryptjs.compare(password, user.password);

    if (!isPsswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials"});
    }
    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save()

    res.status(200).json({ success: true, message:"Logged successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    });
  } catch (err) {
    console.log('Error in login', err);
    
    res.status(400).json({ success: false, message: err.message });
  };
};

export const logout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "User logged out successfully"});
};
