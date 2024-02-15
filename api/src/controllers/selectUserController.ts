import { Request, Response } from "express";
import prisma from "../config/prisma";
import { updateRankings } from "./rankController";

export const createSelectionsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { commonPointsIds } = req.body;

  if (!Array.isArray(commonPointsIds) || commonPointsIds.length === 0 || commonPointsIds.length > 3) {
    return res.status(400).json({ error: "commonPointsIds doit être un tableau de 1 à 3 éléments." });
  }

  const utilisateurIdInt = parseInt(userId, 10);
  try {
    const existingSelections = await prisma.selectionUtilisateur.count({
      where: { userId: utilisateurIdInt },
    });

    if (existingSelections + commonPointsIds.length > 3) {
      return res.status(400).json({ error: "Un utilisateur ne peut avoir que 3 points communs au maximum." });
    }
    await prisma.selectionUtilisateur.deleteMany({
      where: { userId: utilisateurIdInt },
    });

    const selections = await Promise.all(
      commonPointsIds.map((commonPointId: number) =>
        prisma.selectionUtilisateur.create({
          data: {
            userId: utilisateurIdInt,
            commonPointId,
          },
        })
      )
    );

    res.status(200).json(selections);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: "Une violation de la contrainte unique s'est produite." });
    } else if (error.code === 'P2003') {
      return res.status(409).json({ error: "Une violation de la contrainte de clé étrangère s'est produite." });
    }
    console.error(error);
    res.status(500).json({ error: `Erreur du serveur: ${error.message}` });
  }
};

export const compareSelectUser = async (req: Request, res: Response) => {
  const { userId1, userId2 } = req.params;

  if (!userId1 || isNaN(parseInt(userId1, 10)) || !userId2 || isNaN(parseInt(userId2, 10))) {
    return res.status(400).json({ error: "Les identifiants des utilisateurs sont requis et doivent être des nombres." });
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
        selectionsUser2.some(({ commonPoint: point2 }) => commonPointId === point2.id)
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
  createSelectionsForUser, compareSelectUser
};

export { selectUserController }
