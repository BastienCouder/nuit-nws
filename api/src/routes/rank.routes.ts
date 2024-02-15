import express from "express";
import { RankController } from "../controllers/rankController";
const router = express.Router();

// Rank routes
router.post("/", RankController.createRank);
router.get("/", RankController.getRankings);
router.get("/:id", RankController.readUserRank);

// Create Rank
/**
 * @swagger
 * /api/rank/:
 *   post:
 *     summary: Créer un classement pour un utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               score:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Classement créé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */

// Get All Rankings
/**
 * @swagger
 * /api/rank/:
 *   get:
 *     summary: Récupérer tous les classements
 *     responses:
 *       200:
 *         description: Liste des classements récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */

// Get User Rank
/**
 * @swagger
 * /api/rank/{id}:
 *   get:
 *     summary: Récupérer le classement d'un utilisateur spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Classement de l'utilisateur récupéré avec succès
 *       404:
 *         description: Utilisateur non trouvé dans le classement
 *       500:
 *         description: Erreur interne du serveur
 */

export default router;
