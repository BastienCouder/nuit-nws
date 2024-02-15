"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rankController_1 = require("../controllers/rankController");
const router = express_1.default.Router();
// Rank routes
router.post("/", rankController_1.RankController.createRank);
router.get("/", rankController_1.RankController.getRankings);
router.get("/:id", rankController_1.RankController.readUserRank);
// Create Rank
/**
 * @swagger
 * /rank/:
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
 * /rank/:
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
 * /rank/{id}:
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
exports.default = router;
//# sourceMappingURL=rank.routes.js.map