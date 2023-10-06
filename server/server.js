import express from "express";
import dotenv from "dotenv";
dotenv.config();
import products from "./data/products.js";
import { parse } from "path";
import cors from "cors";

const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p._id === productId);
  res.json(product);
});
app.listen(port, () => console.log(`Server running on port ${port}`));
