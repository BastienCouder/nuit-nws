import bodyParser from "body-parser";
import https from "https";
import dotenv from "dotenv";
import cors from "cors";
import express, { Express, Request, Response } from "express";

// Import routes
import userRoutes from "./routes/user.routes";
import rankRoutes from "./routes/rank.routes";
import authRoutes from "./routes/auth.routes";
import selectUserRoutes from "./routes/selectUser.routes";

import commonPointRoutes from "./routes/commonPoint.routes";
import  swaggerUi  from "swagger-ui-express";
import  swaggerDocument  from "./config/swagger";
dotenv.config();

const app: Express = express();
const server = https.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "/" }));

// Définir les options de CORS si nécessaire
const clientUrl = process.env.CLIENT_URL || "http://localhost:8081";
const corsOptions = {
  origin: [clientUrl],
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
    res.send('Express + TypeScript Server. /api-docs pour acceder à la documentation');
  });
  
// Utilisation des routes
app.use("/user", userRoutes);
app.use("/rank", rankRoutes);
app.use("/auth", authRoutes);
app.use("/selectUser", selectUserRoutes);
app.use("/commonPoint", commonPointRoutes);

// Route pour la documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err:Error, req:Request, res:Response) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Le serveur a démarré au port ${PORT}`));