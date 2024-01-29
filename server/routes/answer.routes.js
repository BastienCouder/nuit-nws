import express from "express";
import { answerController } from "../controllers/answerController.js";
const router = express.Router();

// rank routes
router.get("/", answerController.answerRank);
router.post("/", answerController.answerRank); // Nouvelle route pour la création

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
