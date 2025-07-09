import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './lib/db';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import invoiceRoutes from './routes/invoice.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json());

// Connect DB
connectDb();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoice', invoiceRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
