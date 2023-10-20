import { Request, Response } from "express";
import User from "../models/userModel";
import { IUser } from "../models/userModel";
import bcrypt from "bcrypt";

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registration successful!" });
  } catch (err: Error | any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
