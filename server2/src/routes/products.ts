import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../controller/productController";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

export default router;
