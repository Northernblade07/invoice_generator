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

const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Explicitly handle OPTIONS (preflight) requests

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
