import { Request, Response } from "express";
import prisma from "../config/prisma";

export const createSelectionsForUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { commonPointsIds } = req.body;

  // Vérifier si commonPointsIds est un tableau et contient jusqu'à trois éléments
  if (!Array.isArray(commonPointsIds) || commonPointsIds.length === 0 || commonPointsIds.length > 3) {
    return res.status(400).json({ error: "commonPointsIds doit être un tableau de 1 à 3 éléments." });
  }

  const utilisateurIdInt = parseInt(userId, 10);
  try {
    // Récupérer le nombre actuel de sélections pour l'utilisateur
    const existingSelections = await prisma.selectionUtilisateur.count({
      where: { utilisateurId: utilisateurIdInt },
    });

    if (existingSelections + commonPointsIds.length > 3) {
      return res.status(400).json({ error: "Un utilisateur ne peut avoir que 3 points communs au maximum." });
    }

    // Supprimer les anciennes sélections si elles existent
    await prisma.selectionUtilisateur.deleteMany({
      where: { utilisateurId: utilisateurIdInt },
    });

    // Créer de nouvelles sélections pour l'utilisateur
    const selections = await Promise.all(
      commonPointsIds.map((pointCommunId: number) =>
        prisma.selectionUtilisateur.create({
          data: {
            utilisateurId: utilisateurIdInt,
            pointCommunId,
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

  // Vérifier si userId1 et userId2 sont présents et valides
  if (!userId1 || isNaN(parseInt(userId1, 10)) || !userId2 || isNaN(parseInt(userId2, 10))) {
    return res.status(400).json({ error: "Les identifiants des utilisateurs sont requis et doivent être des nombres." });
  }

  try {
    const selectionsUser1 = await prisma.selectionUtilisateur.findMany({
      where: { utilisateurId: parseInt(userId1, 10) },
      include: {
        pointCommun: true, // Inclure les détails du point commun
      },
    });

    const selectionsUser2 = await prisma.selectionUtilisateur.findMany({
      where: { utilisateurId: parseInt(userId2, 10) },
      include: {
        pointCommun: true, // Inclure les détails du point commun
      },
    });

    const commonContents = selectionsUser1
      .filter(({ pointCommun }) =>
        selectionsUser2.some(({ pointCommun: point2 }) => pointCommun.id === point2.id)
      )
      .map(({ pointCommun }) => pointCommun.contenu); // Extraire le contenu du point commun

    if (commonContents.length === 0) {
      return res.status(404).json({ message: "Aucun point commun trouvé." });
    }

    res.status(200).json(commonContents);
  } catch (error: any) {
    res.status(500).json({ error: `Erreur du serveur: ${error.message}` });
  }
};

const selectUserController = {
  createSelectionsForUser, compareSelectUser
};

export { selectUserController }
