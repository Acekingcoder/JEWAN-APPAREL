import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
} from "../controller/productController";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);

export default router;
