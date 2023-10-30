import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    req.user = user.userId;

    next();
  });
};
