import bodyParser from "body-parser";
import http from "http";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
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
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "/" }));

// Définir les options de CORS si nécessaire
// const allowedOrigins = ['http://localhost:8081', 'https://nuit-nws.bastiencouder.com'];

// const corsOptions: CorsOptions = {
//     origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
//       if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'), false);
//       }
//     },
//     credentials: true,
// };
// app.use(cors(corsOptions));

app.use(cors({
  origin: "*", // Permet à toutes les origines d'accéder à l'API
  credentials: true, // Permet les requêtes avec des credentials (cookies, données d'authentification, etc.)
}));

app.get("/api", (req: Request, res: Response) => {
    res.send('Express + TypeScript Server. /api-docs pour acceder à la documentation');
  });
  


// Utilisation des routes


app.use("/api/user", userRoutes);
app.use("/api/rank", rankRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/selectUser", selectUserRoutes);
app.use("/api/commonPoint", commonPointRoutes);

// Route pour la documentation Swagger
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Le serveur a démarré au port ${PORT}`));