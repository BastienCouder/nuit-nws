"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// User routes
router.get("/", userController_1.UserController.readUsers);
router.get("/:token", userController_1.UserController.getUserByToken);
router.post("/", userController_1.UserController.createUser);
router.post("/tab", userController_1.UserController.createUsers);
router.get("/:userId", userController_1.UserController.fetchUser);
//swagger
//read all users
/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur lors de la récupération des utilisateurs
 */
// User By Id
/**
 * @swagger
 * /api/user/{token}:
 *   get:
 *     summary: Récupérer un utilisateur par son Token
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: integer
 *         required: true
 *         description: Token de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
// User By Id
/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Récupérer un utilisateur par son Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id de l'utilisateur à récupérer
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
// create user
/**
 * @swagger
 * /api/user/:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               tel:
 *                 type: string
 *               entreprise:
 *                 type: string
 *               poste:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       409:
 *         description: Un utilisateur avec cet email existe déjà
 *       500:
 *         description: Erreur interne du serveur
 */
exports.default = router;
//# sourceMappingURL=user.routes.js.map