"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.logoutUser = exports.loginUser = exports.deleteUser = exports.getUserByID = exports.getAllUsers = exports.adminUserRegustration = exports.userRegistration = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            username: joi_1.default.string().min(3).max(30).required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: error.details[0].message, msg: "Invalid input" });
        const { username, email, password } = req.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: "Email already exists" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            username,
            email,
            password: hashedPassword,
        });
        yield newUser.save();
        return res
            .status(201)
            .json({ message: "User registration successful!", newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
exports.userRegistration = userRegistration;
const adminUserRegustration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            username: joi_1.default.string().min(3).max(30).required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(6).required(),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res
                .status(400)
                .json({ error: error.details[0].message, msg: "Invalid input" });
        const { username, email, password } = req.body;
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: "Email already exists" });
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new userModel_1.default({
            username,
            email,
            password: hashedPassword,
            isAdmin: true,
        });
        yield newUser.save();
        return res
            .status(201)
            .json({ message: "User registration successful!", newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
exports.adminUserRegustration = adminUserRegustration;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        res.status(200).json({ users });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ msg: "User not found" });
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.getUserByID = getUserByID;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield userModel_1.default.findById(userId);
        if (!user)
            return res.status(404).json({ msg: "User not found" });
        yield userModel_1.default.findByIdAndDelete(userId);
        res.status(200).json({ msg: "User deleted successfully", user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ msg: "Invalid email or password" });
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ msg: "Invalid email or password" });
        const secret = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, secret, { expiresIn: "1d" });
        res.header("Authorization", `Bearer ${token}`);
        res.status(200).json({ msg: "Login successful", token, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Set-Cookie", `jwt=; Max-Age=0`);
    res.status(200).json({ msg: "Logout successful" });
});
exports.logoutUser = logoutUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ msg: "User ID not provided" });
        }
        const user = yield userModel_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const updateData = req.body;
        const allowedFields = ["username", "email"];
        for (const key in updateData) {
            if (allowedFields.includes(key)) {
                user[key] = updateData[key];
            }
        }
        yield user.save();
        res.status(200).json({ msg: "User updated successfully", user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
