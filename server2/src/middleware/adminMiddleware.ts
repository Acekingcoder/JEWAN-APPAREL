import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export const checkAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(req.headers);

    const currentUser = req.user;

    // if (!currentUser || !currentUser.isAdmin) {
    //   return res
    //     .status(403)
    //     .json({ message: "Access Forbidden: Admin privileges required" });
    // }

    next();
  } catch (error: Error | any) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
