import Question from "../schemas/question.js";

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
  updateQuestion,
  deleteQuestion,
};

export { questionController };
