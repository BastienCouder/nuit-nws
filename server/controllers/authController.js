import User from "../schemas/user.js";
import Session from "../schemas/sessionModel.js";
import { getQuestionsByUser } from "./questionController.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const loginWithQR = async (req, res) => {
  const { qrToken } = req.body;

  try {
    const decoded = jwt.verify(qrToken, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const sessionToken = await generateSessionToken(user);
    res
      .status(200)
      .json({ message: "Authentification réussie", token: sessionToken });
  } catch (error) {
    console.error("Erreur lors de l'authentification par QR code :", error);
    res.status(500).json({ error: "Erreur lors de l'authentification." });
  }
};
const generateSessionToken = async (user) => {
  try {
    // Vérifier si une session active existe déjà pour cet utilisateur
    const activeSession = await Session.findOne({
      _id: { $in: user.sessions },
      status: "active",
    });

    if (activeSession) {
      // Si une session active existe déjà, indiquer à l'application client de rediriger l'utilisateur vers la page de réponse à la question
      return getQuestionsByUser(user);
    }

    // Créer une nouvelle session
    const sessionId = new mongoose.Types.ObjectId();
    const newSession = new Session({
      sessionId,
      status: "active",
    });

    await newSession.save();

    // Ajouter la nouvelle session au tableau de sessions de l'utilisateur
    user.sessions.push(newSession._id);
    user.lastLoginAt = new Date();
    await user.save();

    // Générer et retourner un jeton de session
    return jwt.sign({ sessionId: newSession.sessionId }, "another_secret_key", {
      expiresIn: "365d",
    });
  } catch (error) {
    console.error("Erreur lors de la génération du jeton de session :", error);
    throw error;
  }
};

const authController = {
  loginWithQR,
};

export { authController };
