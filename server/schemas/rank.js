import mongoose from "mongoose";

// Création du schéma
const rankSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  idUtilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: { type: Number, required: true },
  position: { type: Number, required: true },
});

// Création du modèle
export default mongoose.model("Rank", rankSchema);
