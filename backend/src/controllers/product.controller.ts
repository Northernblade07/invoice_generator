import { Request, Response } from "express";
import Product from "../models/Product.model";


export const addProduct = async (req:Request, res: Response) => {
  const { name, quantity, rate } = req.body;

  if (!name || !quantity || !rate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  const total = quantity * rate;
  const gst = +(total * 0.18).toFixed(2);

  try {
    const product = await Product.create({
      name,
      quantity,
      rate,
      total,
      gst,
      user: req.user._id,   // ✅ Securely using user from token
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add product", error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }
  try {
    const products = await Product.find({ user: req.user._id });

    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};
