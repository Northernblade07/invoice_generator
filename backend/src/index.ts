import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './lib/db';
import authRoutes from './routes/auth.route';
import productRoutes from './routes/product.route';
import invoiceRoutes from './routes/invoice.route';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options('*', cors({
  origin: FRONTEND_URL,
  credentials: true,
}));


app.use(express.json());

// Connect DB
connectDb();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoice', invoiceRoutes);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
