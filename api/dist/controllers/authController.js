"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.getUserDetails = exports.getQrCodes = exports.loginWithQR = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginWithQR = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { qrToken } = req.body;
    try {
        const decoded = jsonwebtoken_1.default.verify(qrToken, process.env.JWT_SECRET_KEY);
        const user = yield prisma_1.default.user.findUnique({
            where: { email: decoded.email },
        });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        const sessionTokenOrResult = yield generateSessionToken(user);
        if (sessionTokenOrResult.isSessionActive) {
            // Si la session est déjà active, renvoyez la réponse ici
            return res.status(200).json({
                message: "La session est déjà active.",
                token: null,
                user: sessionTokenOrResult.user,
            });
        }
        // Si une nouvelle session a été créée, renvoyez la réponse avec le nouveau token
        const userResponse = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            tel: user.tel,
            entreprise: user.entreprise,
            poste: user.poste,
            score: user.score,
            dateInscription: user.dateInscription,
        };
        console.log("Authentification réussie: ", userResponse);
        res.status(200).json({
            message: "Authentification réussie",
            token: sessionTokenOrResult.token,
            user: userResponse,
        });
    }
    catch (error) {
        console.error("Erreur lors de l'authentification par QR code :", error);
        res.status(500).json({ error: "Erreur lors de l'authentification." });
    }
});
exports.loginWithQR = loginWithQR;
const generateSessionToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activeSession = yield prisma_1.default.session.findFirst({
            where: {
                userId: user.id,
                status: "active",
            },
        });
        if (activeSession) {
            // Si la session est déjà active, retournez un objet indiquant cette situation
            return { isSessionActive: true, user: user };
        }
        // Créer une nouvelle session
        const newSession = yield prisma_1.default.session.create({
            data: {
                status: "active",
                user: { connect: { id: user.id } },
            },
        });
        // Générer et retourner un jeton de session
        const token = jsonwebtoken_1.default.sign({ sessionId: newSession.id }, process.env.ANOTHER_SECRET_KEY, {
            expiresIn: "365d",
        });
        return { isSessionActive: false, token: token };
    }
    catch (error) {
        console.error("Erreur lors de la génération du jeton de session :", error);
        throw error;
    }
});
const getQrCodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany({
            select: {
                nom: true,
                prenom: true,
                qrCodeUrl: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
exports.getQrCodes = getQrCodes;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extraire le token JWT depuis l'entête d'autorisation
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Supposons que le token est envoyé comme "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: "Aucun token fourni." });
        }
        // Vérifier et décoder le token JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded || !decoded.email) {
            return res.status(401).json({ message: "Token invalide." });
        }
        // Trouver l'utilisateur basé sur l'email décodé du token
        const user = yield prisma_1.default.user.findUnique({
            where: { email: decoded.email },
        });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        // Préparer la réponse en excluant les informations sensibles
        const userResponse = {
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            tel: user.tel,
            entreprise: user.entreprise,
            poste: user.poste,
            score: user.score,
            dateInscription: user.dateInscription,
        };
        // Envoyer les détails de l'utilisateur
        res.status(200).json(userResponse);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
        res.status(500).json({
            error: "Erreur lors de la récupération des détails de l'utilisateur.",
        });
    }
});
exports.getUserDetails = getUserDetails;
const authController = {
    loginWithQR: exports.loginWithQR,
    getQrCodes: exports.getQrCodes,
    getUserDetails: exports.getUserDetails,
};
exports.authController = authController;
//# sourceMappingURL=authController.js.map