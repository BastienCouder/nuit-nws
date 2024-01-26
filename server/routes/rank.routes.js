import express from "express";
import { RankController } from "../controllers/rankController.js";
const router = express.Router();
// Utilisez express.Router

// rank routes
router.get("/", RankController.readrank);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
