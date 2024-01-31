import Question from "../schemas/question.js";
import jwt from "jsonwebtoken";
import User from "../schemas/user.js";

// / Create
export const createQuestion = async (req, res, next) => {
  const { contenu, categorie, idCreateur, reponseCorrecte } = req.body;

  try {
    const question = new Question({
      contenu,
      categorie,
      reponseCorrecte,
      idCreateur,
    });

    const savedQuestion = await question.save();

    res.status(201).json({
      success: true,
      message: "Question créée avec succès.",
      question: savedQuestion,
    });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la création de la question.",
    });
  }
};
export const getQuestionsByUser = async (user, res) => {
  try {
    // Rechercher toutes les questions où idCreateur correspond à l'_id de l'utilisateur
    const questions = await Question.findOne({ idCreateur: user._id });

    // Répondre avec les questions trouvées
    res.status(200).json({
      success: true,
      message: "Questions récupérées avec succès.",
      questions,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des questions :", error);
    res.status(500).json({
      error: "Erreur lors de la récupération des questions.",
    });
  }
};

// Read a Random Question from a Specific Category
export const readRandomQuestionByCategory = async (req, res) => {
  const { categorie } = req.params;

  try {
    const questions = await Question.find({ categorie });

    if (!questions.length) {
      return res
        .status(404)
        .json({ message: "Aucune question trouvée pour cette catégorie." });
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];

    res.status(200).json(randomQuestion);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la récupération de la question.",
    });
  }
};

// Get by ID
export const readQuestionById = async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await Question.findOne({ _id: questionId });

    if (!question) {
      return res.status(404).json({ message: "Question non trouvée." });
    }

    res.status(200).json({ message: "Question trouvé avec succès.", question });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de la question.",
    });
  }
};

// Update
export const updateQuestion = async (req, res) => {
  const questionId = req.params.id;
  const updateData = req.body;

  try {
    const question = await Question.findByIdAndUpdate(questionId, updateData, {
      new: true,
    });

    if (!question) {
      return res.status(404).json({ message: "Question non trouvée." });
    }

    res
      .status(200)
      .json({ message: "Question mise à jour avec succès.", question });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la mise à jour de la question.",
    });
  }
};

// Delete
export const deleteQuestion = async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await Question.findByIdAndRemove(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question non trouvée." });
    }

    res.status(200).json({ message: "Question supprimée avec succès." });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({
      error: "Erreur lors de la suppression de la question.",
    });
  }
};

const questionController = {
  createQuestion,
  readRandomQuestionByCategory,
  readQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByUser,
};

export { questionController };
