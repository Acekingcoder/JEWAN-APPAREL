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
exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.getMyOrder = exports.getOrders = exports.createOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: "No order items" });
        }
        else {
            const order = new orderModel_1.default({
                orderItems: orderItems.map((x) => (Object.assign(Object.assign({}, x), { product: x._id, _id: undefined }))),
                user: req.user,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            });
            const createdOrder = yield order.save();
            res
                .status(201)
                .json({ message: "Order created Successfully!", order: createdOrder });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find();
        if (!orders)
            return res.status(404).json({ message: "No orders found" });
        res.status(200).json({ orders });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.getOrders = getOrders;
const getMyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const orders = await Order.find({ user: req.user._id });
    console.log(req.user);
});
exports.getMyOrder = getMyOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).json({ message: "Get order by id" });
    const order = yield orderModel_1.default.findById(req.params.id).populate("user", "name email");
    if (order) {
        res.status(200).json(order);
    }
    else {
        res.status(404).json({ message: "Order not found" });
    }
});
exports.getOrderById = getOrderById;
const updateOrderToPaid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Update order to paid" });
});
exports.updateOrderToPaid = updateOrderToPaid;
const updateOrderToDelivered = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Update order to delivered" });
});
exports.updateOrderToDelivered = updateOrderToDelivered;
