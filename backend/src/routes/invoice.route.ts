import express from "express";
import { generateInvoice } from "../controllers/invoice.controller";
import { verifyToken } from "../middleware/authmiddleware";

const router = express.Router();

router.post("/generate", verifyToken, generateInvoice);

export default router;
