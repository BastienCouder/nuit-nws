import express from "express";
import { selectUserController } from "../controllers/selectUserController";
const router = express.Router();
// Utilisez express.Router

// rank routes
router.post("/:userId", selectUserController.createSelectionsForUser);
router.get('/compare/:userId1/:userId2', selectUserController.compareSelectUser);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
