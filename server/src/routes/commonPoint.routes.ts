import express from "express";
import { commonPointController } from "../controllers/commonPointController";
const router = express.Router();
// Utilisez express.Router

// rank routes
router.get("/", commonPointController.readCommonPoints);
router.post("/", commonPointController.createCommonPoint);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
