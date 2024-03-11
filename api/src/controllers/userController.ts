import jwt from "jsonwebtoken";
import QRCode from "qrcode";
import prisma from "../config/prisma";
import fs from "fs";
import path from "path";
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
    // Créer un nouvel utilisateur avec le QR code URL et le chemin de fichier
    const user: User = await prisma.user.create({
      data: {
        nom,
        prenom,
        email,
        tel,
        entreprise,
        poste,
        count: 0,
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

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching user." });
  }
};

export const createUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = req.body;

  const createdUsers: Array<Object> = []; // To store successfully created users
  const errors: Array<Object> = []; // To collect any errors

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
        continue; // Skip further processing and move to the next user
      }

      // Generate QR token
      const qrToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY!, {
        expiresIn: "365d",
      });

      // Generate QR code URL
      const qrCodeUrl = await QRCode.toDataURL(qrToken);

      // Create user
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
          count: 0,
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
        error,
      });
    }
  }

  // Handling response based on operation outcome
  if (errors.length > 0) {
    return res.status(400).json({
      message: "Certains utilisateurs n'ont pas pu être créés.",
      errors,
      createdUsers,
    });
  }

  return res.status(201).json({
    message: "Tous les utilisateurs ont été créés avec succès.",
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
