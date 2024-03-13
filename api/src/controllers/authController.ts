import { User } from "@prisma/client";
import prisma from "../config/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit";

export const loginWithQR = async (req: Request, res: Response) => {
  const { qrToken } = req.body;

  try {
    const decoded: any = jwt.verify(qrToken, process.env.JWT_SECRET_KEY!);
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const sessionTokenOrResult = await generateSessionToken(user);

    if (sessionTokenOrResult.isSessionActive) {
      // Si la session est déjà active, renvoyez la réponse ici
      return res.status(200).json({
        message: "La session est déjà active.",
        token: null,
        user: sessionTokenOrResult.user,
      });
    }

    // Si une nouvelle session a été créée, renvoyez la réponse avec le nouveau token
    const userResponse = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      tel: user.tel,
      entreprise: user.entreprise,
      poste: user.poste,
      score: user.score,
      dateInscription: user.dateInscription,
    };

    console.log("Authentification réussie: ", userResponse);

    res.status(200).json({
      message: "Authentification réussie",
      token: sessionTokenOrResult.token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Erreur lors de l'authentification par QR code :", error);
    res.status(500).json({ error: "Erreur lors de l'authentification." });
  }
};

const generateSessionToken = async (user: User) => {
  try {
    const activeSession = await prisma.session.findFirst({
      where: {
        userId: user.id,
        status: "active",
      },
    });

    if (activeSession) {
      // Si la session est déjà active, retournez un objet indiquant cette situation
      return { isSessionActive: true, user: user };
    }

    // Créer une nouvelle session
    const newSession = await prisma.session.create({
      data: {
        status: "active",
        user: { connect: { id: user.id } },
      },
    });

    // Générer et retourner un jeton de session
    const token = jwt.sign(
      { sessionId: newSession.id },
      process.env.ANOTHER_SECRET_KEY!,
      {
        expiresIn: "365d",
      }
    );
    return { isSessionActive: false, token: token };
  } catch (error) {
    console.error("Erreur lors de la génération du jeton de session :", error);
    throw error;
  }
};

export const getQrCodes = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        nom: true,
        prenom: true,
        qrCodeUrl: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const generatePdfWithQRCodes = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        nom: true,
        prenom: true,
        qrCodeUrl: true,
      },
    });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=users_qrcodes.pdf"
    );
    doc.pipe(res);

    let xPos = 50; // Position de départ en X
    let yPos = 50; // Position de départ en Y
    const qrCodeSize = 120; // Taille des QR codes (augmentée par rapport à 100)
    const spacing = 30; // Espace entre les QR codes et les textes

    users.forEach((user, index) => {
      doc
        .fontSize(10)
        .text(`${user.prenom} ${user.nom}`, xPos, yPos + qrCodeSize + 10, {
          width: qrCodeSize,
          align: "center",
        });

      doc.image(
        Buffer.from(user.qrCodeUrl.split(",")[1], "base64"),
        xPos,
        yPos,
        {
          fit: [qrCodeSize, qrCodeSize],
          align: "center",
        }
      );
    });

    doc.end();
  } catch (error) {
    console.error("Erreur lors de la génération du PDF :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    // Extraire le token JWT depuis l'entête d'autorisation
    const token = req.headers.authorization?.split(" ")[1]; // Supposons que le token est envoyé comme "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "Aucun token fourni." });
    }

    // Vérifier et décoder le token JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    if (!decoded || !decoded.email) {
      return res.status(401).json({ message: "Token invalide." });
    }

    // Trouver l'utilisateur basé sur l'email décodé du token
    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Préparer la réponse en excluant les informations sensibles
    const userResponse = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      tel: user.tel,
      entreprise: user.entreprise,
      poste: user.poste,
      score: user.score,
      dateInscription: user.dateInscription,
    };

    // Envoyer les détails de l'utilisateur
    res.status(200).json(userResponse);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de l'utilisateur :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la récupération des détails de l'utilisateur.",
    });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  const { userId } = req.params; // Ou req.body, selon votre conception API

  // Assurez-vous que userId est fourni
  if (!userId) {
    return res.status(400).json({ error: "UserId is required" });
  }

  try {
    // Suppression de toutes les sessions associées à l'userId
    const deleteCount = await prisma.session.deleteMany({
      where: {
        userId: parseInt(userId),
      },
    });

    // Vérifiez si des sessions ont été supprimées
    if (deleteCount.count > 0) {
      res.json({
        message: `Sessions for user ${userId} deleted successfully.`,
      });
    } else {
      res
        .status(404)
        .json({ message: "No sessions found for the specified user." });
    }
  } catch (error) {
    console.error("Failed to delete session:", error);
    res
      .status(500)
      .json({ error: "Internal server error while deleting session." });
  }
};

const authController = {
  loginWithQR,
  getQrCodes,
  getUserDetails,
  generatePdfWithQRCodes,
  deleteSession,
};

export { authController };
