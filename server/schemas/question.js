import mongoose from "mongoose";

// Création du schéma
const questionSchema = new mongoose.Schema({
  contenu: { type: String, required: true },
  reponseCorrecte: { type: String, required: true },
  categorie: {
    type: String,
    required: true,
    enum: ["travail", "loisirs", "personnel", "alimentaire", ""],
  },
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
