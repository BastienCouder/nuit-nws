import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const dbUri = process.env.MONGO_URI;
    if (!dbUri) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(dbUri);
    console.log("Mongo connecté");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error.message);
    process.exit(1);
  }
};
