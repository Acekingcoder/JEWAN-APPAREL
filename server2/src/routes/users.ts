import express from "express";
const router = express.Router();
import { userRegistration } from "../controller/userController";
import {
  getAllUsers,
  getUserByID,
  deleteUser,
  loginUser,
  logoutUser,
  updateUser,
} from "../controller/userController";

import { checkAdminMiddleware } from "../middleware/adminMiddleware";

import { authMiddleware } from "../middleware/authMiddleware";

/* GET users listing. */
router.get("/", getAllUsers);
router.post("/register", userRegistration);
router.get("/:id", getUserByID);
router.delete("/:id", authMiddleware, deleteUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.put("/update/:id", updateUser);
export default router;
