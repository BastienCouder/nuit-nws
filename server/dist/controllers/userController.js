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
exports.UserController = exports.readQrCodes = exports.getUserById = exports.createUser = exports.readUsers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const qrcode_1 = __importDefault(require("qrcode"));
const prisma_1 = __importDefault(require("../config/prisma"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const qrcode_2 = require("qrcode");
// Read
const readUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            error: "Erreur lors de la lecture des données des utilisateurs.",
        });
    }
});
exports.readUsers = readUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nom, prenom, email, tel, entreprise, poste } = req.body;
    try {
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res
                .status(409)
                .json({ error: "Un utilisateur avec cet email existe déjà." });
        }
        //Générer un jeton unique pour l'utilisateur
        const qrToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "365d",
        });
        // Générer un QR code à partir du jeton
        const qrCodeUrl = yield qrcode_1.default.toDataURL(qrToken);
        // Définir un chemin et nom de fichier pour le QR code
        const qrImagesDir = path_1.default.join(__dirname, '..', 'uploads', 'qr_images');
        if (!fs_1.default.existsSync(qrImagesDir)) {
            fs_1.default.mkdirSync(qrImagesDir, { recursive: true });
        }
        const qrImagePath = path_1.default.join(qrImagesDir, `${prenom}_${nom}_qrcode.png`);
        const saveQRCode = new Promise((resolve, reject) => {
            const stream = fs_1.default.createWriteStream(qrImagePath);
            (0, qrcode_2.toFileStream)(stream, qrToken, (error) => {
                if (error) {
                    console.error("Erreur lors de la sauvegarde du fichier QR code :", error);
                    reject(error);
                }
            });
            stream.on("finish", () => {
                console.log("QR Code saved at:", qrImagePath);
                resolve(""); // Résoudre la promesse lorsque l'écriture du fichier est terminée
            });
            stream.on("error", (error) => {
                console.error("Erreur lors de l'écriture du fichier QR code :", error);
                reject(error); // Rejeter la promesse en cas d'erreur lors de l'écriture du fichier
            });
        });
        yield saveQRCode;
        const maxLength = 45; // Ajustez ceci en fonction de la longueur maximale de votre colonne
        const truncatedQrCodeUrl = qrCodeUrl.length > maxLength ? qrCodeUrl.substring(0, maxLength) : qrCodeUrl;
        // Créer un nouvel utilisateur avec le QR code URL et le chemin de fichier
        const user = yield prisma_1.default.user.create({
            data: {
                nom,
                prenom,
                email,
                tel,
                entreprise,
                poste,
                qrCodeUrl: truncatedQrCodeUrl,
                qrToken,
                lastLoginAt: new Date(),
            },
        });
        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    }
    catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: {
                id: Number(id),
            },
        });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: "Utilisateur non trouvé." });
        }
    }
    catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
exports.getUserById = getUserById;
//code qr
const readQrCodes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany({
            select: {
                nom: true,
                prenom: true,
                qrCodeUrl: true,
            }
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ error: "Erreur interne du serveur" });
    }
});
exports.readQrCodes = readQrCodes;
const UserController = {
    readUsers: exports.readUsers,
    createUser: exports.createUser,
    getUserById: exports.getUserById,
    readQrCodes: exports.readQrCodes
};
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map