import mongoose from "mongoose";

// Création du schéma
const answerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  contenu: { type: String, required: true },
  categorie: {type: String,required: true, enum: ["travail", "loisirs", "personnel", "alimentaire", ""],},
  dateCreation: { type: Date, default: Date.now },
  idCreateur: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},
});

// Création du modèle
export default mongoose.model("Answer", answerSchema);
