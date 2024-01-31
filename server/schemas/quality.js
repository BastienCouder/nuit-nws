import mongoose from "mongoose";

// Modèle Quality
const qualitySchema = new mongoose.Schema({
  contenu: { type: String, required: true, unique: true },
});

const Question = mongoose.model("Quality", qualitySchema);

export default Question;
