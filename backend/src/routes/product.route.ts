import express from "express";
import { addProduct, getProducts } from "../controllers/product.controller";
import { verifyToken } from "../middleware/authmiddleware";
const router = express.Router();
router.post("/add",verifyToken, addProduct);
router.get("/all", verifyToken, getProducts);
export default router