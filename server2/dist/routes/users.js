"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const userController_2 = require("../controller/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
/* GET users listing. */
router.get("/", userController_2.getAllUsers);
router.post("/register", userController_1.userRegistration);
router.get("/:id", userController_2.getUserByID);
router.delete("/:id", authMiddleware_1.authMiddleware, userController_2.deleteUser);
router.post("/login", userController_2.loginUser);
router.post("/logout", userController_2.logoutUser);
router.put("/update/:id", userController_2.updateUser);
exports.default = router;
