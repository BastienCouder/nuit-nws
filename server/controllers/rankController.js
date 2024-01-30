import Rank from "../schemas/rank.js"; // Modèle de classement
import User from "../schemas/user.js"; // Modèle utilisateur

// Créer un classement pour un nouvel utilisateur ou activité
export const createRank = async (req, res, next) => {
  const { idUtilisateur, score } = req.body;

  try {
    const rank = new Rank({
      idUtilisateur,
      score,
      position: 0,
    });

    const savedRank = await rank.save();
    res
      .status(201)
      .json({ message: "Classement créé avec succès.", rank: savedRank });
  } catch (error) {
    console.error("Erreur lors de la création du classement :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création du classement." });
  }
};

// Lire la position actuelle d'un utilisateur
export const readUserRank = async (req, res) => {
  const userId = req.params.id; // Ou req.user.id si vous utilisez l'authentification

  try {
    const userRank = await Rank.findOne({ idUtilisateur: userId });

    if (!userRank) {
      return res
        .status(404)
        .json({ message: "Utilisateur non trouvé dans le classement." });
    }

    res.status(200).json({
      userId: userId,
      position: userRank.position,
      score: userRank.score,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la lecture du classement de l'utilisateur :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la lecture du classement de l'utilisateur.",
    });
  }
};

// Mettre à jour le classement de tous les utilisateurs
export const updateRankings = async (req, res) => {
  try {
    const users = await User.find({}).sort({ score: -1 });

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      await Rank.findOneAndUpdate(
        { idUtilisateur: user._id },
        { score: user.score, position: i + 1 },
        { upsert: true }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du classement :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du classement." });
  }
};

// Obtenir tous les classements
export const getRankings = async (req, res) => {
  try {
    const rankings = await Rank.find({})
      .populate("idUtilisateur", ["nom", "prenom"])
      .sort({ position: 1 });
    res.status(200).json(rankings);
  } catch (error) {
    console.error("Erreur lors de la récupération des classements :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des classements." });
  }
};

// Mettre à jour le classement d'un utilisateur spécifique
export const updateRank = async (req, res) => {
  const userId = req.params.id;
  const { score } = req.body;

  try {
    const updatedRank = await Rank.findOneAndUpdate(
      { idUtilisateur: userId },
      { score },
      { new: true }
    );

    if (!updatedRank) {
      return res.status(404).json({ message: "Classement non trouvé." });
    }

    res.status(200).json({
      message: "Classement mis à jour avec succès.",
      rank: updatedRank,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du classement :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du classement." });
  }
};

// Supprimer le classement d'un utilisateur
export const deleteRank = async (req, res) => {
  const userId = req.params.id;

  try {
    const rank = await Rank.findOneAndRemove({ idUtilisateur: userId });

    if (!rank) {
      return res.status(404).json({ message: "Classement non trouvé." });
    }

    res.status(200).json({ message: "Classement supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du classement :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du classement." });
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
