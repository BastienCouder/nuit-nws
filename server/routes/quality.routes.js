import express from "express";
import { qualityController } from "../controllers/qualityController.js";
const router = express.Router();
// Utilisez express.Router

// rank routes
router.get("/", qualityController.readQualities);
router.post("/", qualityController.createQuality);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
