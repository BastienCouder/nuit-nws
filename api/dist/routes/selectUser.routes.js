"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const selectUserController_1 = require("../controllers/selectUserController");
const router = express_1.default.Router();
// selectUser routes
router.post("/:userId", selectUserController_1.selectUserController.createSelectionsForUser);
router.get('/compare/:userId1/:userId2', selectUserController_1.selectUserController.compareSelectUser);
/**
 * @swagger
 * /selectUser/{userId}:
 *   post:
 *     summary: Créer des sélections de points communs pour un utilisateur
 *     description: Permet de créer jusqu'à trois sélections de points communs pour un utilisateur donné.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de l'utilisateur pour lequel créer les sélections
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commonPointsIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Les IDs des points communs à sélectionner
 *     responses:
 *       200:
 *         description: Sélections créées avec succès
 *       400:
 *         description: Données invalides fournies ou nombre de sélections dépassé
 *       409:
 *         description: Violation de contrainte unique ou de clé étrangère
 *       500:
 *         description: Erreur interne du serveur
 */
/**
 * @swagger
 * /selectUser/compare/{userId1}/{userId2}:
 *   get:
 *     summary: Comparer les sélections de points communs entre deux utilisateurs
 *     description: Permet de trouver les points communs sélectionnés par deux utilisateurs donnés.
 *     parameters:
 *       - in: path
 *         name: userId1
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du premier utilisateur
 *       - in: path
 *         name: userId2
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID du deuxième utilisateur
 *     responses:
 *       200:
 *         description: Points communs trouvés avec succès
 *       400:
 *         description: Identifiants des utilisateurs invalides ou manquants
 *       404:
 *         description: Aucun point commun trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
exports.default = router;
//# sourceMappingURL=selectUser.routes.js.map