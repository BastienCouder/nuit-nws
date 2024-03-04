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
    const lineSpacing = qrCodeSize + 40; // Espace vertical pour la nouvelle ligne

    users.forEach((user, index) => {
      const nextXPos = xPos + qrCodeSize + spacing; // Calculer la prochaine position X

      // Ajouter le nom et prénom sous l'image du QR code
      doc
        .fontSize(10)
        .text(`${user.prenom} ${user.nom}`, xPos, yPos + qrCodeSize + 10, {
          width: qrCodeSize,
          align: "center",
        });

      // Ajouter l'image du QR code
      doc.image(
        Buffer.from(user.qrCodeUrl.split(",")[1], "base64"),
        xPos,
        yPos,
        {
          fit: [qrCodeSize, qrCodeSize], // Utiliser qrCodeSize pour les dimensions
          align: "center",
        }
      );

      if (nextXPos + qrCodeSize > doc.page.width - 50) {
        // Vérifier si on dépasse la largeur de la page
        xPos = 50; // Réinitialiser la position X pour la nouvelle ligne
        yPos += lineSpacing; // Décaler la position Y pour la nouvelle ligne
      } else {
        xPos = nextXPos; // Passer à la position X suivante sur la même ligne
      }

      // Vérifier si on atteint la fin de la page pour ajouter une nouvelle page et réinitialiser les positions
      if (yPos > doc.page.height - 100) {
        doc.addPage();
        xPos = 50;
        yPos = 50;
      }
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

const authController = {
  loginWithQR,
  getQrCodes,
  getUserDetails,
  generatePdfWithQRCodes,
};

export { authController };
