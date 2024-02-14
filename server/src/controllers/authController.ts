import { User } from "@prisma/client";
import prisma from "../config/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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
    const token = jwt.sign({ sessionId: newSession.id }, process.env.ANOTHER_SECRET_KEY!, {
      expiresIn: "365d",
    });
    return { isSessionActive: false, token: token };
  } catch (error) {
    console.error("Erreur lors de la génération du jeton de session :", error);
    throw error;
  }
};


export const   getQrCodes = async (req: Request, res: Response) => {
  try {
      const users = await prisma.user.findMany({
          select: {
              nom: true,
              prenom: true,
              qrCodeUrl: true,
          }
      });
      res.status(200).json(users);
  } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

const authController = {
  loginWithQR,
  getQrCodes
};

export { authController };
