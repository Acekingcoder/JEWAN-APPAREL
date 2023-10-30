import { Request, Response } from "express";
import User from "../models/userModel";
import { IUser } from "../models/userModel";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";

export const userRegistration = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, msg: "Invalid input" });
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

    return res
      .status(201)
      .json({ message: "User registration successful!", newUser });
  } catch (err: Error | any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const adminUserRegustration = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, msg: "Invalid input" });
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registration successful!", newUser });
  } catch (err: Error | any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err: Error | any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const getUserByID = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({ user });
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    await User.findByIdAndDelete(userId);
    res.status(200).json({ msg: "User deleted successfully", user });
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ msg: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ msg: "Invalid email or password" });

    const secret = process.env.JWT_SECRET as string;
    const token: string = jwt.sign(
      { userId: user._id, email: user.email },
      secret,
      { expiresIn: "1d" }
    );

    res.header("Authorization", `Bearer ${token}`);

    res.status(200).json({ msg: "Login successful", token, user });
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.setHeader("Set-Cookie", `jwt=; Max-Age=0`);
  res.status(200).json({ msg: "Logout successful" });
};

interface User {
  _id: string;
  username: string;
  email: string;
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    console.log(userId);

    if (!userId) {
      return res.status(400).json({ msg: "User ID not provided" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updateData = req.body as Partial<User>;

    const allowedFields: (keyof User)[] = ["username", "email"];

    for (const key in updateData) {
      if (allowedFields.includes(key as keyof User)) {
        user[key as keyof User] = updateData[key as keyof User];
      }
    }

    await user.save();

    res.status(200).json({ msg: "User updated successfully", user });
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
