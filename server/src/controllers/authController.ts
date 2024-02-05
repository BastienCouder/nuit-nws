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

    const sessionToken = await generateSessionToken(user);

    const {
      nom,
      prenom,
      email,
      tel,
      entreprise,
      poste,
      score,
      dateInscription,
    } = user;

    const userResponse = {
      nom,
      prenom,
      email,
      tel,
      entreprise,
      poste,
      score,
      dateInscription,
    };

    console.log("Authentification réussie: ", userResponse);

    res.status(200).json({
      message: "Authentification réussie",
      token: sessionToken,
      user: userResponse,
    });
  } catch (error) {
    console.error("Erreur lors de l'authentification par QR code :", error);
    res.status(500).json({ error: "Erreur lors de l'authentification." });
  }
};

const generateSessionToken = async (user: any) => {
  try {
    const activeSession = await prisma.session.findFirst({
      where: {
        userId: user.id,
        status: "active",
      },
    });

    if (activeSession) {
      return user;
    }

    // Créer une nouvelle session
    const newSession = await prisma.session.create({
      data: {
        status: "active",
        user: { connect: { id: user.id } },
      },
    });

    // Générer et retourner un jeton de session
    return jwt.sign({ sessionId: newSession.id }, process.env.ANOTHER_SECRET_KEY!, {
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
