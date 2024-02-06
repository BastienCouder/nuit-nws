import express from "express";
import { commonPointController } from "../controllers/commonPointController";
const router = express.Router();

// Common Point routes
router.get("/", commonPointController.readCommonPoints);
router.post("/", commonPointController.createCommonPoint);
router.put("/", commonPointController.readCommonPoints);
router.delete("/", commonPointController.createCommonPoint);


// Create Common Point
/**
 * @swagger
 * /commonPoint/:
 *   post:
 *     summary: Créer un nouveau point commun
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenu:
 *                 type: string
 *     responses:
 *       201:
 *         description: Point commun créé avec succès
 *       400:
 *         description: Données invalides fournies
 *       500:
 *         description: Erreur interne du serveur
 */

// Read Common Points
/**
 * @swagger
 * /commonPoint/:
 *   get:
 *     summary: Récupérer tous les points communs
 *     responses:
 *       200:
 *         description: Liste des points communs récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */

// Update Common Point
/**
 * @swagger
 * /commonPoint/:
 *   put:
 *     summary: Mettre à jour un point commun
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               contenu:
 *                 type: string
 *     responses:
 *       200:
 *         description: Point commun mis à jour avec succès
 *       400:
 *         description: Données invalides fournies
 *       500:
 *         description: Erreur interne du serveur
 */

// Delete Common Point
/**
 * @swagger
 * /commonPoint/:
 *   delete:
 *     summary: Supprimer un point commun
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Point commun supprimé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */

export default router;
