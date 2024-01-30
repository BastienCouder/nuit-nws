import User from "../schemas/user.js";
import Session from "../schemas/sessionModel.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const loginWithQR = async (req, res) => {
  const { qrToken } = req.body;

  try {
    const decoded = jwt.verify(qrToken, "your_secret_key");

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const sessionToken = await generateSessionToken(user);
    res
      .status(200)
      .json({ message: "Authentification réussie", token: sessionToken });
  } catch (error) {
    if (error.message === "Une session existe déjà pour cet utilisateur.") {
      return res.status(409).json({ message: error.message }); // 409 Conflict
    }
    console.error("Erreur lors de l'authentification par QR code :", error);
    res.status(500).json({ error: "Erreur lors de l'authentification." });
  }
};

const authController = {
  loginWithQR,
};

export { authController };

const generateSessionToken = async (user) => {
  try {
    // Trouver une session existante pour cet utilisateur ou en créer une nouvelle
    let session = await Session.findOne({
      userEmail: user.email,
      status: "active",
    });
    if (session) {
      // Si une session active existe, réinitialiser sa durée de vie (optionnel)
      session.createdAt = new Date();
      console.log("active");
      await session.save();
    } else {
      // Sinon, créer une nouvelle session
      const sessionId = new mongoose.Types.ObjectId();
      session = await new Session({
        sessionId,
        userId: user.email,
        status: "active", // ou "pending" selon votre logique de flux
      }).save();

      // Ajouter la session au tableau de sessions de l'utilisateur
      user.sessions.push(session._id);
      await user.save(); // Sauvegarder les modifications de l'utilisateur
    }

    // Générer et retourner un jeton de session
    return jwt.sign({ sessionId: session.sessionId }, "another_secret_key", {
      expiresIn: "15m",
    });
  } catch (error) {
    console.error("Erreur lors de la génération du jeton de session :", error);
    throw error;
  }
};
