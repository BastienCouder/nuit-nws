"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// Routes d'authentification
router.post("/login/qr", authController_1.authController.loginWithQR);
router.get("/qrcodes", authController_1.authController.getQrCodes);
router.get("/details", authController_1.authController.getUserDetails);
/**
 * @swagger
 * /api/auth/login/qr:
 *   post:
 *     summary: Se connecter avec un QR code
 *     description: Permet à un utilisateur de se connecter en utilisant un QR code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - qrToken
 *             properties:
 *               qrToken:
 *                 type: string
 *                 description: Le jeton JWT encodé dans le QR code.
 *     responses:
 *       200:
 *         description: Authentification réussie, renvoie les informations de l'utilisateur et un jeton de session.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: Le jeton de session généré pour l'utilisateur.
 *                 user:
 *                   type: object
 *                   properties:
 *                     nom:
 *                       type: string
 *                     prenom:
 *                       type: string
 *                     email:
 *                       type: string
 *                     tel:
 *                       type: string
 *                     entreprise:
 *                       type: string
 *                     poste:
 *                       type: string
 *                     score:
 *                       type: integer
 *                     dateInscription:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur interne du serveur.
 */
//qr codes
/**
 * @swagger
 * /api/auth/qrcodes:
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
//# sourceMappingURL=auth.routes.js.map