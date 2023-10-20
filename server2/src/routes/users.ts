import express from "express";
const router = express.Router();
import { userRegistration } from "../controller/userController";

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/register", userRegistration);

export default router;
