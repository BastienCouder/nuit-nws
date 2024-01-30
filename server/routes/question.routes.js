import express from "express";
import { questionController } from "../controllers/questionController.js";
const router = express.Router();

// question routes
// Lire une question aléatoire par catégorie
router.get(
  "/random/:categorie",
  questionController.readRandomQuestionByCategory
);
router.get("/:id", questionController.readQuestionById);

// Créer une question
router.post("/", questionController.createQuestion);

// Mettre à jour une question
router.put("/:id", questionController.updateQuestion);

// Supprimer une question
router.delete("/:id", questionController.deleteQuestion);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
