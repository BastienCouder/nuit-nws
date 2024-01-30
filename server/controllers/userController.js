import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import User from "../schemas/user.js";

// Read
export const readUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la lecture des données des utilisateurs.",
    });
  }
};

export const createUser = async (req, res, next) => {
  const { nom, prenom, email, tel, entreprise, poste } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Un utilisateur avec cet email existe déjà." });
    }

    // Générer un jeton unique pour l'utilisateur
    const qrToken = jwt.sign({ email }, "your_secret_key", {
      expiresIn: "365d",
    }); // Expire après 1 an

    // Générer un QR code à partir du jeton
    const qrCodeUrl = await QRCode.toDataURL(qrToken);

    // Créer un nouvel utilisateur avec le jeton QR
    const user = new User({
      nom,
      prenom,
      email,
      tel,
      entreprise,
      poste,
      qrToken, // Ajouter le qrToken au document utilisateur
    });

    // Sauvegarder l'utilisateur
    await user.save();
    res
      .status(201)
      .json({ message: "Utilisateur créé avec succès", qrCodeUrl, user });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: messages.join(". ") });
    }
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const login = (req, res, next) => {};

const UserController = {
  readUser,
  createUser,
};

export { UserController };
