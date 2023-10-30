"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controller/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/create", authMiddleware_1.authMiddleware, orderController_1.createOrder);
router.get("/all", authMiddleware_1.authMiddleware, orderController_1.getOrders);
router.get("/myorder", orderController_1.getMyOrder);
router.get("/:id", authMiddleware_1.authMiddleware, orderController_1.getOrderById);
router.put("/:id/pay", authMiddleware_1.authMiddleware, orderController_1.updateOrderToPaid);
router.put("/:id/deliver", authMiddleware_1.authMiddleware, orderController_1.updateOrderToDelivered);
exports.default = router;
