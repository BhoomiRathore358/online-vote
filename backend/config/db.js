import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Render ke Environment Variables se MONGODB_URI lega
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Error aane par process ko rok dega
  }
};

// ES Modules Named Export
export { connectDB };



