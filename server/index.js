import express from "express";
import bodyParser from "body-parser";
import http from "http";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js"; // Assurez-vous que le chemin est correct
import rankRoutes from "./routes/rank.routes.js"; // Assurez-vous que le chemin est correct
import questionRoutes from "./routes/question.routes.js"; // Assurez-vous que le chemin est correct
import responseRoutes from "./routes/response.routes.js"; // Assurez-vous que le chemin est correct
import authRoutes from "./routes/auth.routes.js"; // Assurez-vous que le chemin est correct

connectDB();
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "/" }));

// Définir les options de CORS
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000"; // Valeur par défaut si CLIENT_URL n'est pas défini
const corsOptions = {
  origin: [clientUrl], // Utilisation de clientUrl
  credentials: true,
};

app.use(cors(corsOptions));

// Utilisation des routes user
app.use("/user", userRoutes);

// Utilisation des routes user
app.use("/rank", rankRoutes);

// Utilisation des routes answer
app.use("/question", questionRoutes);

// Utilisation des routes answer
app.use("/response", responseRoutes);

// Utilisation des routes auth
app.use("/auth", authRoutes);

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Le serveur a démarré au port ${PORT}`));
