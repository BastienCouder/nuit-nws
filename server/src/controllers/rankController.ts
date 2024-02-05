import { Request, Response } from "express";
import prisma from "../config/prisma";
import { Rank } from "@prisma/client";

export const createRank = async (req: Request, res: Response) => {
  const { idUtilisateur, score } = req.body;

  try {
    const rank: Rank = await prisma.rank.create({
      data: {
        idUtilisateur,
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
      where: { idUtilisateur: userId },
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

export const updateRankings = async (req: Request, res: Response) => {
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
          idUtilisateur: user.id,
        },
        update: {
          score: user.score,
          position,
        },
        create: {
          idUtilisateur: user.id,
          score: user.score,
          position,
        },
      });
    }

    res.status(200).json({ message: "Classement mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du classement :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du classement." });
  }
};

export const getRankings = async (req: Request, res: Response) => {
  try {
    const rankings = await prisma.rank.findMany({
      orderBy: {
        position: 'asc',
      },
    });
    res.status(200).json(rankings);
  } catch (error) {
    console.error("Erreur lors de la récupération des classements :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des classements." });
  }
};

export const updateRank = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { score } = req.body;

  try {
    const updatedRank = await prisma.rank.update({
      where: { idUtilisateur: userId },
      data: { score },
    });

    res.status(200).json({
      message: "Classement mis à jour avec succès.",
      rank: updatedRank,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du classement :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du classement." });
  }
};

export const deleteRank = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    await prisma.rank.delete({
      where: { idUtilisateur: userId },
    });
    res.status(200).json({ message: "Classement supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du classement :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du classement." });
  }
};

const RankController = {
  createRank,
  readUserRank,
  updateRankings,
  getRankings,
  updateRank,
  deleteRank,
};

export { RankController };