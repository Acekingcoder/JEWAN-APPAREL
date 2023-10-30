import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controller/orderController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/all", authMiddleware, getOrders);
router.get("/myorder", getMyOrder);
router.get("/:id", authMiddleware, getOrderById);
router.put("/:id/pay", authMiddleware, updateOrderToPaid);
router.put("/:id/deliver", authMiddleware, updateOrderToDelivered);

export default router;
