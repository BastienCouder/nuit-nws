import mongoose from "mongoose";

// Création du schéma
const responseSchema = new mongoose.Schema({
  idQuestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  idUtilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  contenu: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Quality", required: true },
  ],
  dateReponse: { type: Date, default: Date.now },
});

// Création du modèle
const Response = mongoose.model("Response", responseSchema);

export default Response;
