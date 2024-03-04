import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import prisma from "../config/prisma";
import fs from "fs";
import path from "path";
import { toFileStream } from "qrcode";
import { Request, Response } from "express";
import { User } from "@prisma/client";

// Read
export const readUsers = async (req: Request, res: Response) => {
  try {
    const users: User[] = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la lecture des données des utilisateurs.",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { nom, prenom, email, tel, entreprise, poste } = req.body;
  try {
    const existingUser: User | null = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Un utilisateur avec cet email existe déjà." });
    }

    //Générer un jeton unique pour l'utilisateur
    const qrToken: string = jwt.sign({ email }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "365d",
    });

    // Générer un QR code à partir du jeton
    const qrCodeUrl: string = await QRCode.toDataURL(qrToken);

    // Définir un chemin et nom de fichier pour le QR code
    const qrImagesDir = path.join(__dirname, "..", "uploads", "qr_images");
    if (!fs.existsSync(qrImagesDir)) {
      fs.mkdirSync(qrImagesDir, { recursive: true });
    }

    const qrImagePath = path.join(qrImagesDir, `${email}_qrcode.png`);
    await QRCode.toFile(qrImagePath, qrToken);

    // Créer un nouvel utilisateur avec le QR code URL et le chemin de fichier
    const user: User = await prisma.user.create({
      data: {
        nom,
        prenom,
        email,
        tel,
        entreprise,
        poste,
        qrCodeUrl,
        qrToken,
        lastLoginAt: new Date(),
      },
    });

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getUserByToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        qrToken: token,
      },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const fetchUser = async (req: Request, res: Response) => {
  const { userId } = req.params; // Extracting userId from the request parameters

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId), // Ensure the userId is properly cast to a Number if it's passed as a String
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with the user data if the user is found
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching user." });
  }
};

export const createUsers = async (req: Request, res: Response) => {
  const users = req.body;

  const createdUsers = [];
  const errors = [];

  for (const { nom, prenom, email, tel, entreprise, poste } of users) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        errors.push({
          email,
          error: "Un utilisateur avec cet email existe déjà.",
        });
        continue;
      }

      const qrToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY!, {
        expiresIn: "365d",
      });

      const qrCodeUrl = await QRCode.toDataURL(qrToken);

      const qrImagesDir = path.join(__dirname, "..", "uploads", "qr_images");
      if (!fs.existsSync(qrImagesDir)) {
        fs.mkdirSync(qrImagesDir, { recursive: true });
      }
      const qrImagePath = path.join(qrImagesDir, `${email}_qrcode.png`);
      await QRCode.toFile(qrImagePath, qrToken);

      const user = await prisma.user.create({
        data: {
          nom,
          prenom,
          email,
          tel,
          entreprise,
          poste,
          qrCodeUrl,
          qrToken,
          lastLoginAt: new Date(),
        },
      });

      createdUsers.push(user);
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'utilisateur :",
        email,
        error
      );
      errors.push({
        email,
        error: "Erreur lors de la création de l'utilisateur.",
      });
    }
  }

  if (errors.length > 0) {
    // Si des erreurs se sont produites pendant la création des utilisateurs
    return res.status(400).json({
      message: "Certains utilisateurs n'ont pas pu être créés.",
      errors,
      createdUsers,
    });
  }

  return res.status(201).json({
    message: "Tous les utilisateurs ont été créés avec succès",
    createdUsers,
  });
};

const UserController = {
  readUsers,
  createUser,
  getUserByToken,
  fetchUser,
  createUsers,
};

export { UserController };
