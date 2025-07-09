import mongoose, { Document, Schema } from 'mongoose';

export interface ProductItem {
  name: string;
  quantity: number;
  rate: number;
  total: number;
  gst: number;
}

export interface InvoiceDocument extends Document {
  user: mongoose.Types.ObjectId;
  products: ProductItem[];
  totalAmount: number;
  gstAmount: number;
  grandTotal: number;
  date: Date;
}

const ProductItemSchema = new Schema<ProductItem>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  total: { type: Number, required: true },
  gst: { type: Number, required: true },
});

const InvoiceSchema = new Schema<InvoiceDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [ProductItemSchema],
  totalAmount: { type: Number, required: true },
  gstAmount: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export const Invoice = mongoose.model<InvoiceDocument>('Invoice', InvoiceSchema);
