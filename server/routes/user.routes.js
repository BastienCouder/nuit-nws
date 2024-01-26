import express from "express";
import { UserController } from "../controllers/userController.js";
const router = express.Router();
// Utilisez express.Router

// user routes
router.get("/", UserController.readUser);

// Exportez le routeur en utilisant la syntaxe ES6
export default router;
