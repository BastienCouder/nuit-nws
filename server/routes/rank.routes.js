import express from "express";
import { RankController } from "../controllers/rankController.js";
const router = express.Router();
// Utilisez express.Router

// rank routes
router.post("/", RankController.createRank);
router.get("/", RankController.getRankings);
router.get("/:id", RankController.readUserRank);
// router.put("/:id", RankController.updateRankings);
router.put("/", RankController.updateRank);
router.delete("/", RankController.deleteRank);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
