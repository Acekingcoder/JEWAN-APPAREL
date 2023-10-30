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
exports.updateProduct = exports.addProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while fetching products" });
    }
});
exports.getProducts = getProducts;
// @desc Fetch a product by id
// @route GET /api/products/:id
// @access Public
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield productModel_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching product" });
    }
});
exports.getProductById = getProductById;
// @desc delete a product by id
// @route DELETE /api/products
// @access Private/Admin
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    try {
        const product = yield productModel_1.default.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        yield productModel_1.default.findByIdAndDelete(productId);
        res.status(200).json({ message: "Product deleted successfully", product });
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching product" });
    }
});
exports.deleteProduct = deleteProduct;
// @desc Add a product
// @route POST /api/products
// @access Private/Admin
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { image, name, category, description, price, countInStock } = req.body;
    try {
        const product = new productModel_1.default({
            image,
            name,
            category,
            description,
            price,
            countInStock,
        });
        const newProduct = yield product.save();
        res
            .status(201)
            .json({ message: "Product added successfully", product: newProduct });
    }
    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "An error occurred while adding product" });
    }
});
exports.addProduct = addProduct;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const updatedProductData = req.body;
        const product = yield productModel_1.default.findByIdAndUpdate(productId, updatedProductData, { new: true });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "An error occurred while updating product", error });
    }
});
exports.updateProduct = updateProduct;
