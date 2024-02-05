import express from "express";
import { RankController } from "../controllers/rankController";
const router = express.Router();

// Rank routes
router.post("/", RankController.createRank);
router.get("/", RankController.getRankings);
router.get("/:id", RankController.readUserRank);
router.put("/", RankController.updateRank);
router.delete("/", RankController.deleteRank);

export default router;
