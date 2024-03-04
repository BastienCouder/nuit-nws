"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// Import routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const rank_routes_1 = __importDefault(require("./routes/rank.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const selectUser_routes_1 = __importDefault(require("./routes/selectUser.routes"));
const commonPoint_routes_1 = __importDefault(require("./routes/commonPoint.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./config/swagger"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.text({ type: "/" }));
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
app.use((0, cors_1.default)({
    origin: "*", // Permet à toutes les origines d'accéder à l'API
    credentials: true, // Permet les requêtes avec des credentials (cookies, données d'authentification, etc.)
}));
app.get("/api", (req, res) => {
    res.send('Express + TypeScript Server. /api-docs pour acceder à la documentation');
});
// Utilisation des routes
app.use("/api/user", user_routes_1.default);
app.use("/api/rank", rank_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.use("/api/selectUser", selectUser_routes_1.default);
app.use("/api/commonPoint", commonPoint_routes_1.default);
// Route pour la documentation Swagger
app.use("/api/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Lancement du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Le serveur a démarré au port ${PORT}`));
//# sourceMappingURL=index.js.map