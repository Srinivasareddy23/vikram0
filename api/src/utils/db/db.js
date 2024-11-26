import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", result.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default dbConnection;
