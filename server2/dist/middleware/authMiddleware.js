"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    console.log(req.headers);
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
    const tokenParts = authorizationHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        return res
            .status(401)
            .json({ message: "Invalid Authorization header format" });
    }
    const token = tokenParts[1];
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token is not valid" });
        }
        req.user = user.userId;
        next();
    });
};
exports.authMiddleware = authMiddleware;
