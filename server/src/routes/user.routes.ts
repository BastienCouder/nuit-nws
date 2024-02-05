import express from "express";
import { UserController } from "../controllers/userController";
const router = express.Router();

// User routes
//swagger
//users
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
router.get("/", UserController.readUsers);

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
router.post("/", UserController.createUser);


export default router;
