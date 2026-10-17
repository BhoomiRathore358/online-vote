// 🚨 Vercel par dotenv ko sabse upar call karna zaroori hai
require('dotenv').config(); 
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Vercel ke dashboard wala MONGODB_URI yahan load hoga
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Cloud Connected: ${conn.connection.host} 🚀`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        // Vercel par crash hone se bachane ke liye process.exit mat chalayein
    }
};

module.exports = connectDB;
