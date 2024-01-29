import mongoose from "mongoose";

//Création du schéma
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String, required: false },
  entreprise: { type: String, required: false },
  poste: { type: String, required: false },
  role: { type: String, required: false, default: "user" },
  score: { type: Number, default: 0 },
  dateInscription: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
