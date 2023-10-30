import { Request, Response, Router } from "express";
import Order from "../models/orderModel";

export const createOrder = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "No order items" });
    } else {
      const order = new Order({
        orderItems: orderItems.map((x: any) => ({
          ...x,
          product: x._id,
          _id: undefined,
        })),
        user: req.user,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .json({ message: "Order created Successfully!", order: createdOrder });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    if (!orders) return res.status(404).json({ message: "No orders found" });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getMyOrder = async (req: Request, res: Response) => {
  // const orders = await Order.find({ user: req.user._id });

  console.log(req.user);
};

export const getOrderById = async (req: Request, res: Response) => {
  // res.status(200).json({ message: "Get order by id" });

  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
};

export const updateOrderToPaid = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Update order to paid" });
};

export const updateOrderToDelivered = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Update order to delivered" });
};
