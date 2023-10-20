import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/productModel";
import products from "../data/products";

// @desc Fetch all products
// @route GET /api/products
// @access Public

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

// @desc Fetch a product by id
// @route GET /api/products/:id
// @access Public

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product" });
  }
};

// @desc delete a product by id
// @route DELETE /api/products
// @access Private/Admin

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await ProductModel.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching product" });
  }
};

// @desc Add a product
// @route POST /api/products
// @access Private/Admin

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { image, name, category, description, price, countInStock } = req.body;
  try {
    const product = new ProductModel({
      image,
      name,
      category,
      description,
      price,
      countInStock,
    });

    const newProduct = await product.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "An error occurred while adding product" });
  }
};
