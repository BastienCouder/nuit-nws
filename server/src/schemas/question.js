import mongoose from "mongoose";

// Création du schéma
const questionSchema = new mongoose.Schema({
  reponseCorrecte: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Quality", required: true },
  ],
  idCreateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateCreation: { type: Date, default: Date.now },
});

// Création du modèle
const Question = mongoose.model("Question", questionSchema);

export default Question;
