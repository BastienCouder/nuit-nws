import Response from "../schemas/response.js";
import Question from "../schemas/question.js";
import User from "../schemas/user.js";
import { updateRankings } from "../controllers/rankController.js";

export const createResponse = async (req, res) => {
  const { idQuestion, idUtilisateur, contenu } = req.body;

  try {
    const question = await Question.findById(idQuestion).populate(
      "reponseCorrecte"
    );
    if (!question) {
      return res.status(404).json({ message: "Question non trouvée." });
    }

    // Vérifier quelles réponses sont correctes
    const correctResponses = question.reponseCorrecte.map((quality) =>
      quality._id.toString()
    );
    const correctCount = contenu.filter((id) =>
      correctResponses.includes(id)
    ).length;
    const isCorrect = correctCount === correctResponses.length;

    const response = new Response({
      idQuestion,
      idUtilisateur,
      contenu,
      isCorrect,
    });

    await response.save();

    if (correctCount > 0) {
      // Mettre à jour le score basé sur le nombre de réponses correctes
      await User.findByIdAndUpdate(idUtilisateur, {
        $inc: { score: correctCount },
      });
      updateRankings();
    }

    res.status(201).json({
      message: "Réponse créée avec succès.",
      response,
      isCorrect,
      correctCount,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la réponse :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la réponse." });
  }
};

// Lire toutes les réponses
export const readResponses = async (req, res) => {
  try {
    const responses = await Response.find({});
    res.status(200).json(responses);
  } catch (error) {
    console.error("Erreur lors de la lecture des réponses :", error);
    res.status(500).json({ error: "Erreur lors de la lecture des réponses." });
  }
};

// Lire une réponse spécifique par ID
export const readResponseById = async (req, res) => {
  const responseId = req.params.id;

  try {
    const response = await Response.findById(responseId);

    if (!response) {
      return res.status(404).json({ message: "Réponse non trouvée." });
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Erreur lors de la lecture de la réponse :", error);
    res.status(500).json({ error: "Erreur lors de la lecture de la réponse." });
  }
};

export const updateResponse = async (req, res) => {
  const responseId = req.params.id;
  const updateData = req.body;

  try {
    const updatedResponse = await Response.findByIdAndUpdate(
      responseId,
      updateData,
      { new: true }
    );

    if (!updatedResponse) {
      return res.status(404).json({ message: "Réponse non trouvée." });
    }

    res.status(200).json({
      message: "Réponse mise à jour avec succès.",
      response: updatedResponse,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la réponse :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la réponse." });
  }
};

export const deleteResponse = async (req, res) => {
  const responseId = req.params.id;

  try {
    const response = await Response.findByIdAndRemove(responseId);

    if (!response) {
      return res.status(404).json({ message: "Réponse non trouvée." });
    }

    res.status(200).json({ message: "Réponse supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la réponse :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la réponse." });
  }
};

const responseController = {
  createResponse,
  readResponses,
  readResponseById,
  updateResponse,
  deleteResponse,
};

export { responseController };
