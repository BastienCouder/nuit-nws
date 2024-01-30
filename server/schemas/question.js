import mongoose from "mongoose";

// Création du schéma
const questionSchema = new mongoose.Schema({
  contenu: { type: String, required: true },
  categorie: {
    type: String,
    required: true,
    enum: ["travail", "loisirs", "personnel", "alimentaire", ""],
  },
  dateCreation: { type: Date, default: Date.now },
  idCreateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Création du modèle
const Question = mongoose.model("Question", questionSchema);

export default Question;
