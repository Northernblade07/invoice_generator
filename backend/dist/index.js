"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./lib/db");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const invoice_route_1 = __importDefault(require("./routes/invoice.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:5173'];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Explicitly handle OPTIONS (preflight) requests
app.use(express_1.default.json());
// Connect DB
(0, db_1.connectDb)();
// Routes
app.use('/api/auth', auth_route_1.default);
app.use('/api/products', product_route_1.default);
app.use('/api/invoice', invoice_route_1.default);
app.listen(PORT, () => {
    console.log(`✅ Server running on ${PORT}`);
});
