import express from "express";
import { UserController } from "../controllers/userController";
const router = express.Router();

// User routes
router.get("/", UserController.readUsers);
router.get("/:id", UserController.getUserById);
router.get("/qrcodes", UserController.readQrCodes);
router.post("/", UserController.createUser);

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

export default router;
