import { Request, Response } from "express";
import prisma from "../config/prisma";
import { updateRankings } from "./rankController";

export const getSelectedUsers = async (req: Request, res: Response) => {
  const { userId } = req.params; // l'ID de l'utilisateur qui a effectué les sélections

  if (!userId || isNaN(parseInt(userId, 10))) {
    return res.status(400).json({
      error:
        "L'identifiant de l'utilisateur est requis et doit être un nombre.",
    });
  }

  try {
    // Recherche de toutes les sélections faites par l'utilisateur
    const selections = await prisma.selectionUtilisateur.findMany({
      where: {
        userId: parseInt(userId, 10),
      },
      include: {
        commonPoint: true, // Inclut les détails des points communs sélectionnés si nécessaire
      },
    });

    if (selections.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur sélectionné trouvé." });
    }

    // Optionnel: Transformer les résultats si nécessaire avant de les envoyer
    const formattedSelections = selections.map((selection) => ({
      selectedUserId: selection.userIdSelect,
      commonPoints: selection.commonPoint.contenu,
    }));

    res.status(200).json(formattedSelections);
  } catch (error: any) {
    console.error(
      "Erreur lors de la récupération des utilisateurs sélectionnés:",
      error
    );
    res.status(500).json({ error: `Erreur du serveur: ${error.message}` });
  }
};

export const createSelectionsForUser = async (req: Request, res: Response) => {
  const { userId, userIdSelect } = req.params;
  const { commonPointsIds } = req.body;

  const utilisateurIdInt = parseInt(userId, 10);
  const utilisateurIdSelectInt = parseInt(userIdSelect, 10);

  if (utilisateurIdInt === utilisateurIdSelectInt) {
    return res
      .status(400)
      .json({ error: "Un utilisateur ne peut pas se sélectionner lui-même." });
  }

  if (
    !Array.isArray(commonPointsIds) ||
    commonPointsIds.length === 0 ||
    commonPointsIds.length > 3
  ) {
    return res.status(400).json({
      error: "commonPointsIds doit être un tableau de 1 à 3 éléments.",
    });
  }

  try {
    const existingSelectionsCount = await prisma.selectionUtilisateur.count({
      where: {
        userId: utilisateurIdInt,
        userIdSelect: utilisateurIdSelectInt,
      },
    });

    if (existingSelectionsCount + commonPointsIds.length > 3) {
      return res.status(400).json({
        error:
          "Un utilisateur ne peut avoir que 3 points communs au maximum par utilisateur sélectionné.",
      });
    }

    // Si aucune sélection précédente n'existe, préparer pour incrémenter le compteur après création des sélections
    const isFirstTimeSelection = existingSelectionsCount === 0;

    const selections = await Promise.all(
      commonPointsIds.map((commonPointId) =>
        prisma.selectionUtilisateur.create({
          data: {
            userId: utilisateurIdInt,
            userIdSelect: utilisateurIdSelectInt,
            commonPointId,
          },
        })
      )
    );

    // Incrémenter le compteur uniquement si c'est la première sélection entre ces deux utilisateurs
    if (isFirstTimeSelection) {
      await prisma.user.update({
        where: { id: utilisateurIdInt },
        data: { count: { increment: 1 } },
      });
    }

    return res.status(200).json(selections);
  } catch (error) {
    console.error("Error creating selections:", error);
    return res.status(500).json({
      error: `Erreur du serveur: ${
        error instanceof Error ? error.message : error
      }`,
    });
  }
};

export const compareSelectUser = async (req: Request, res: Response) => {
  const { userId1, userId2 } = req.params;

  if (
    !userId1 ||
    isNaN(parseInt(userId1, 10)) ||
    !userId2 ||
    isNaN(parseInt(userId2, 10))
  ) {
    return res.status(400).json({
      error:
        "Les identifiants des utilisateurs sont requis et doivent être des nombres.",
    });
  }

  try {
    const selectionsUser1 = await prisma.selectionUtilisateur.findMany({
      where: { userId: parseInt(userId1, 10) },
      include: {
        commonPoint: true,
      },
    });

    const selectionsUser2 = await prisma.selectionUtilisateur.findMany({
      where: { userId: parseInt(userId2, 10) },
      include: {
        commonPoint: true,
      },
    });

    const commonContents = selectionsUser1
      .filter(({ commonPointId }) =>
        selectionsUser2.some(
          ({ commonPoint: point2 }) => commonPointId === point2.id
        )
      )
      .map(({ commonPoint }) => commonPoint.contenu);

    const scoreUpdate = commonContents.length * 1;

    if (commonContents.length > 0) {
      await prisma.user.update({
        where: { id: parseInt(userId1, 10) },
        data: { score: { increment: scoreUpdate } },
      });

      await prisma.user.update({
        where: { id: parseInt(userId2, 10) },
        data: { score: { increment: scoreUpdate } },
      });
      await updateRankings();
    } else {
      return res.status(404).json({ message: "Aucun point commun trouvé." });
    }

    res.status(200).json({ commonContents, scoreUpdate });
  } catch (error: any) {
    res.status(500).json({ error: `Erreur du serveur: ${error.message}` });
  }
};

const selectUserController = {
  createSelectionsForUser,
  compareSelectUser,
  getSelectedUsers,
};

export { selectUserController };
