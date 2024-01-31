import mongoose from "mongoose";

//Création du schéma
const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String, required: false },
  entreprise: { type: String, required: false },
  poste: { type: String, required: false },
  role: { type: String, required: false, default: "user" },
  score: { type: Number, default: 0 },
  dateInscription: { type: Date, default: Date.now },
  qrCodeUrl: {
    type: String,
    required: true,
  },
  qrToken: { type: String, required: true },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
  lastLoginAt: { type: Date },
});

export default mongoose.model("User", userSchema);
