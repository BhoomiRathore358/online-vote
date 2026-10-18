import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import candidateRoutes from './routes/candidateRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';


// Environment variables configuration
dotenv.config();

// Database Connection
connectDB();

const app = express();

// 1. CORS Setup (Ise hamesha sabse upar hona chahiye, aur URL ke end me '/' nahi hona chahiye)
// ❌ Purane app.use(cors({...})) wale pure hisse ko hataiye aur sirf ye likhiye:
app.use(cors({
  origin: 'https://vercel.com/bhoomirathore358/online-vote', // Aapka Vercel URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// 2. Body Parser Middleware
app.use(express.json());

// 🔴 TEST ROUTE: Yeh check karne ke liye ki server sahi se chal raha hai ya nahi
app.get('/api/test', (req, res) => {
    res.status(200).json({ message: "Backend is working perfectly on Render!" });
});

// 3. Main Routes Mapping
app.use('/api/candidates', candidateRoutes);
app.use('/api/auth', authRoutes);

// 4. Server Port Configuration (Render dynamic port deta hai)
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 5. ES Modules Export (module.exports hata diya hai)
export default app;

