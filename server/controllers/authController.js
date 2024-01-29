import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import Session from "../schemas/sessionModel.js";

const AuthController = {
  generateQRCode: async (req, res) => {
    const sessionId = generateSessionId();
    const token = jwt.sign({ sessionId }, "your_secret_key");

    try {
      // Créer une nouvelle session dans la base de données
      await new Session({ sessionId }).save();

      QRCode.toDataURL(token, (err, url) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erreur lors de la génération du QR code" });
        }
        res.json({ qrCodeUrl: url, sessionId });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  pollSession: async (req, res) => {
    const { sessionId } = req.params;

    try {
      const session = await Session.findOne({ sessionId });

      if (!session) {
        return res.status(404).json({ error: "Session non trouvée" });
      }

      if (session.status === "authenticated") {
        // Générer un jeton d'authentification pour l'utilisateur
        const authToken = jwt.sign(
          { userId: session.userId },
          "your_secret_key",
          { expiresIn: "1h" }
        ); // Expire après 1 heure
        res.json({ status: session.status, authToken });
      } else {
        res.json({ status: session.status });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  validateQRCode: async (req, res) => {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, "your_secret_key");
      const session = await Session.findOne({ sessionId: decoded.sessionId });

      if (!session) {
        return res.status(404).json({ error: "Session non trouvée" });
      }

      // Supposons que le jeton contient userId
      session.userId = decoded.userId;
      session.status = "authenticated";
      await session.save();

      res.json({ message: "QR code validé avec succès" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

// ...

// Génère un identifiant de session unique
function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}

export default AuthController;
