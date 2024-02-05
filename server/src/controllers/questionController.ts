// import Question from "../schemas/question.js";

// // / Create
// export const createQuestion = async (req, res, next) => {
//   const { idCreateur, reponseCorrecte } = req.body;

//   // Assurez-vous que reponseCorrecte est un tableau
//   if (!Array.isArray(reponseCorrecte)) {
//     return res.status(400).json({
//       error: "Le champ reponseCorrecte doit être un tableau.",
//     });
//   }

//   try {
//     const question = new Question({
//       reponseCorrecte,
//       idCreateur,
//     });

//     const savedQuestion = await question.save();

//     res.status(201).json({
//       success: true,
//       message: "Question créée avec succès.",
//       question: savedQuestion,
//     });
//   } catch (error) {
//     console.error("Erreur lors de la création de la question :", error);
//     res.status(500).json({
//       error: "Erreur lors de la création de la question.",
//     });
//   }
// };

// export const getQuestionsByUser = async (user) => {
//   try {
//     const questions = await Question.find({ idCreateur: user._id });
//     return questions;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des questions :", error);
//     throw error;
//   }
// };

// // Get by ID
// export const readQuestionById = async (req, res) => {
//   const questionId = req.params.id;

//   try {
//     const questions = await Question.find({ _id: questionId });

//     if (!questions) {
//       return res.status(404).json({ message: "Question non trouvée." });
//     }

//     res.status(200).json({ message: "Question trouvé avec succès.", question });
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(500).json({
//       error: "Erreur lors de la mise à jour de la question.",
//     });
//   }
// };

// // Update
// export const updateQuestion = async (req, res) => {
//   const questionId = req.params.id;
//   const updateData = req.body;

//   try {
//     const question = await Question.findByIdAndUpdate(questionId, updateData, {
//       new: true,
//     });

//     if (!question) {
//       return res.status(404).json({ message: "Question non trouvée." });
//     }

//     res
//       .status(200)
//       .json({ message: "Question mise à jour avec succès.", question });
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(500).json({
//       error: "Erreur lors de la mise à jour de la question.",
//     });
//   }
// };

// // Delete
// export const deleteQuestion = async (req, res) => {
//   const questionId = req.params.id;

//   try {
//     const question = await Question.findByIdAndRemove(questionId);

//     if (!question) {
//       return res.status(404).json({ message: "Question non trouvée." });
//     }

//     res.status(200).json({ message: "Question supprimée avec succès." });
//   } catch (error) {
//     console.error("Erreur :", error);
//     res.status(500).json({
//       error: "Erreur lors de la suppression de la question.",
//     });
//   }
// };

// const questionController = {
//   createQuestion,
//   readQuestionById,
//   updateQuestion,
//   deleteQuestion,
//   getQuestionsByUser,
// };

// export { questionController };
