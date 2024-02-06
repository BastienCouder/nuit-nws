import { Request, Response } from "express";
import prisma from "../config/prisma";
import { Rank } from "@prisma/client";

export const createRank = async (req: Request, res: Response) => {
  const { userId, score } = req.body;

  try {
    const rank: Rank = await prisma.rank.create({
      data: {
        userId,
        score,
        position: 0,
      },

    });
    res.status(201).json({ message: "Classement créé avec succès.", rank });
  } catch (error) {
    console.error("Erreur lors de la création du classement :", error);
    res.status(500).json({ error: "Erreur lors de la création du classement." });
  }
};

export const readUserRank = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const userRank: Rank | null = await prisma.rank.findUnique({
      where: { userId: userId },
    });

    if (!userRank) {
      return res.status(404).json({ message: "Utilisateur non trouvé dans le classement." });
    }

    res.status(200).json(userRank);
  } catch (error) {
    console.error("Erreur lors de la lecture du classement de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur lors de la lecture du classement de l'utilisateur." });
  }
};

export const updateRankings = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        score: 'desc',
      },
    });

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const position = i + 1;

      await prisma.rank.upsert({
        where: {
          userId: user.id,
        },
        update: {
          score: user.score,
          position,
        },
        create: {
          userId: user.id,
          score: user.score,
          position,
        },
      });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du classement :", error);
  }
};

export const getRankings = async (req: Request, res: Response) => {
  try {
    const rankings = await prisma.rank.findMany({
      orderBy: {
        position: 'asc',
      },
      include: { user: true, }
    });
    res.status(200).json(rankings);
  } catch (error) {
    console.error("Erreur lors de la récupération des classements :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des classements." });
  }
};

const RankController = {
  createRank,
  readUserRank,
  updateRankings,
  getRankings,
};

export { RankController };