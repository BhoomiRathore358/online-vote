const mongoose = require('mongoose');

// Humne link direct yahan daal diya hai taaki environment variable ka jhanjhat khatam ho jaye
const DB_URL = "mongodb+srv://bhumirathore565_db_user:8JO2zesHTPHqUnGo@cluster0.w832fta.mongodb.net/myProjectDB?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URL);
        console.log(`MongoDB Cloud Connected: ${conn.connection.host} 🚀`);
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        // Vercel par crash se bachne ke liye hum process.exit(1) nahi chalayenge
    }
};

export default connectDB; 


