import express from "express";
import { authController } from "../controllers/authController.js";

const router = express.Router();

// Routes d'authentification
router.post("/login/qr", authController.loginWithQR);

export default router;
