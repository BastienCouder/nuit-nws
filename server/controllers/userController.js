import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import User from "../schemas/user.js";
import fs from "fs";
import { toFileStream } from "qrcode";

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
    const qrToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "365d", // Expire après 1 an
    });

    // Générer un QR code à partir du jeton
    const qrCodeUrl = await QRCode.toDataURL(qrToken);

    // Définir un chemin et nom de fichier pour le QR code
    const qrImagePath = `./uploads/qr_images/${prenom}_${nom}_qrcode.png`;

    const saveQRCode = new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(qrImagePath);
      toFileStream(stream, qrToken, (error) => {
        if (error) {
          console.error(
            "Erreur lors de la sauvegarde du fichier QR code :",
            error
          );
          reject(error);
        }
      });

      stream.on("finish", () => {
        console.log("QR Code saved at:", qrImagePath);
        resolve(); // Résoudre la promesse lorsque l'écriture du fichier est terminée
      });

      stream.on("error", (error) => {
        console.error("Erreur lors de l'écriture du fichier QR code :", error);
        reject(error); // Rejeter la promesse en cas d'erreur lors de l'écriture du fichier
      });
    });

    await saveQRCode;

    // Créer un nouvel utilisateur avec le QR code URL et le chemin de fichier
    const user = new User({
      nom,
      prenom,
      email,
      tel,
      entreprise,
      poste,
      qrToken,
      qrCodeUrl,
    });

    await user.save(); // Sauvegarder l'utilisateur
    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ error: messages.join(". ") });
    }
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const UserController = {
  readUser,
  createUser,
};

export { UserController };
