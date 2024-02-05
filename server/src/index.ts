import bodyParser from "body-parser";
import http from "http";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

// Import routes
import userRoutes from "./routes/user.routes";
import rankRoutes from "./routes/rank.routes";
import questionRoutes from "./routes/question.routes";
import responseRoutes from "./routes/response.routes";
import authRoutes from "./routes/auth.routes";
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

// // Définir les options de CORS si nécessaire
// const clientUrl = process.env.CLIENT_URL || "http://localhost:3000"; // Valeur par défaut si CLIENT_URL n'est pas défini
// const corsOptions = {
//   origin: [clientUrl], // Utilisation de clientUrl
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
    res.send('Express + TypeScript Server. /api-docs pour acceder à la documentation');
  });
  
// Utilisation des routes
app.use("/user", userRoutes);
app.use("/rank", rankRoutes);
app.use("/question", questionRoutes);
app.use("/response", responseRoutes);
app.use("/auth", authRoutes);
app.use("/commonPoint", commonPointRoutes);

// Route pour la documentation Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Le serveur a démarré au port ${PORT}`));