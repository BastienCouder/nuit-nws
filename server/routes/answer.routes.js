import express from "express";
import { RankController } from "../controllers/rankController.js";
const router = express.Router();

// rank routes
router.get("/", RankController.readrank);
router.post("/", RankController.readrank); // Nouvelle route pour la création

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
