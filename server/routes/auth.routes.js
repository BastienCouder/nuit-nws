import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

// Routes d'authentification
router.get("/qr", AuthController.generateQRCode);
router.get("/poll/:sessionId", AuthController.pollSession);
router.post("/validate", AuthController.validateQRCode);

export default router;
