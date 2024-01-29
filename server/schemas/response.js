import mongoose from "mongoose";

// Création du schéma
const responseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idQuestion: {type: mongoose.Schema.Types.ObjectId,ref: "Answer",required: true,},
  idUtilisateur: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},
  contenu: { type: String, required: true },
  dateReponse: { type: Date, default: Date.now },
});

// Création du modèle
export default mongoose.model("Response", responseSchema);
