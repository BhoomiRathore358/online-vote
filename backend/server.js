import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import candidateRoutes from './routes/candidateRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// 🔴 TEST ROUTE: यह चेक करने के लिए कि सर्ver रूट्स पहचान रहा है या नहीं
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: "Backend is working perfectly on Port 6000!" });
});

// Main Routes Mapping
app.use('/api/candidates', candidateRoutes);
app.use('/api/auth', authRoutes);
app.use(cors({
  origin: 'https://online-vote-delta.vercel.app/', // Yahan apne Vercel frontend ka URL dalein
  credentials: true
}));

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
