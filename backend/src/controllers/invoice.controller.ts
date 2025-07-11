import { Request, Response } from "express";
import { generatePDFBuffer } from "../lib/utils";
import { Invoice } from "../models/Invoice.model";

interface ProductInput {
  name: string;
  quantity: number;
  rate: number;
}

export const generateInvoice = async (req: Request, res: Response) => {
  try {
   const { products }: { products: ProductInput[] } = req.body;

    const user = req.user // Assuming you have auth middleware setting req.user

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Calculate totals
    const totalAmount = products.reduce((sum: number, p: ProductInput) => sum + (p.quantity * p.rate), 0);
    const gstAmount = +(totalAmount * 0.18).toFixed(2);
    const grandTotal = +(totalAmount + gstAmount).toFixed(2);

    // Save invoice to DB
    const newInvoice = new Invoice({
      user: user._id,
      products: products.map((p: ProductInput) => ({
        name: p.name,
        quantity: p.quantity,
        rate: p.rate,
        total: p.quantity * p.rate,
        gst: +(p.quantity * p.rate * 0.18).toFixed(2),
      })),
      totalAmount,
      gstAmount,
      grandTotal,
      date: new Date(),
    });

    const savedInvoice = await newInvoice.save();

    // Generate PDF
    const pdfBuffer = await generatePDFBuffer(savedInvoice.products, user);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate invoice", error });
  }
};
