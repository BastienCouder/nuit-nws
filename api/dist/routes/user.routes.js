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
router.get("/:id", userController_1.UserController.getUserById);
router.get("/qrcodes", userController_1.UserController.readQrCodes);
router.post("/", userController_1.UserController.createUser);
//swagger
//read all users
/**
 * @swagger
 * /user/:
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
 * /user/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'utilisateur à récupérer
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
 * /user/:
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
//qr codes
/**
 * @swagger
 * /user/qrcodes:
 *   get:
 *     summary: Récupérer tous les QR codes des utilisateurs
 *     description: Cette route permet de récupérer les noms, prénoms et URLs des QR codes de tous les utilisateurs.
 *     responses:
 *       200:
 *         description: Liste des QR codes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nom:
 *                     type: string
 *                     description: Le nom de l'utilisateur
 *                   prenom:
 *                     type: string
 *                     description: Le prénom de l'utilisateur
 *                   qrCodeUrl:
 *                     type: string
 *                     description: L'URL du QR code de l'utilisateur
 *       500:
 *         description: Erreur interne du serveur
 */
exports.default = router;
//# sourceMappingURL=user.routes.js.map