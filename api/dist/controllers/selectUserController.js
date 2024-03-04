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
exports.selectUserController = exports.compareSelectUser = exports.createSelectionsForUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const rankController_1 = require("./rankController");
const createSelectionsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extraction des IDs depuis les paramètres de la requête
    const { userId, userIdSelect } = req.params;
    const { commonPointsIds } = req.body;
    console.log(userId);
    console.log(userIdSelect);
    // Validation des commonPointsIds
    if (!Array.isArray(commonPointsIds) ||
        commonPointsIds.length === 0 ||
        commonPointsIds.length > 3) {
        return res.status(400).json({
            error: "commonPointsIds doit être un tableau de 1 à 3 éléments.",
        });
    }
    // Conversion des userId et userIdSelect en entiers
    const utilisateurIdInt = parseInt(userId, 10);
    const utilisateurIdSelectInt = parseInt(userIdSelect, 10);
    try {
        // Compte le nombre de sélections existantes pour cette paire d'utilisateurs
        const existingSelections = yield prisma_1.default.selectionUtilisateur.count({
            where: {
                userId: utilisateurIdInt,
                userIdSelect: utilisateurIdSelectInt,
            },
        });
        // Vérifie si l'ajout des nouveaux points communs respecte la limite de 3 sélections par utilisateur sélectionné
        if (existingSelections + commonPointsIds.length > 3) {
            return res.status(400).json({
                error: "Un utilisateur ne peut avoir que 3 points communs au maximum par utilisateur sélectionné.",
            });
        }
        // Création des nouvelles sélections avec gestion des deux IDs
        const selections = yield Promise.all(commonPointsIds.map((commonPointId) => prisma_1.default.selectionUtilisateur.create({
            data: {
                userId: utilisateurIdInt,
                userIdSelect: utilisateurIdSelectInt,
                commonPointId,
            },
        })));
        // Envoie les sélections créées en réponse
        return res.status(200).json(selections);
    }
    catch (error) {
        // Gestion des erreurs spécifiques à la base de données
        if (error instanceof Error &&
            error.name === "PrismaClientKnownRequestError")
            // Gestion des autres types d'erreurs
            console.error(error);
        return res.status(500).json({
            error: `Erreur du serveur: ${error instanceof Error ? error.message : error}`,
        });
    }
});
exports.createSelectionsForUser = createSelectionsForUser;
const compareSelectUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId1, userId2 } = req.params;
    if (!userId1 ||
        isNaN(parseInt(userId1, 10)) ||
        !userId2 ||
        isNaN(parseInt(userId2, 10))) {
        return res.status(400).json({
            error: "Les identifiants des utilisateurs sont requis et doivent être des nombres.",
        });
    }
    try {
        const selectionsUser1 = yield prisma_1.default.selectionUtilisateur.findMany({
            where: { userId: parseInt(userId1, 10) },
            include: {
                commonPoint: true,
            },
        });
        const selectionsUser2 = yield prisma_1.default.selectionUtilisateur.findMany({
            where: { userId: parseInt(userId2, 10) },
            include: {
                commonPoint: true,
            },
        });
        const commonContents = selectionsUser1
            .filter(({ commonPointId }) => selectionsUser2.some(({ commonPoint: point2 }) => commonPointId === point2.id))
            .map(({ commonPoint }) => commonPoint.contenu);
        const scoreUpdate = commonContents.length * 1;
        if (commonContents.length > 0) {
            yield prisma_1.default.user.update({
                where: { id: parseInt(userId1, 10) },
                data: { score: { increment: scoreUpdate } },
            });
            yield prisma_1.default.user.update({
                where: { id: parseInt(userId2, 10) },
                data: { score: { increment: scoreUpdate } },
            });
            yield (0, rankController_1.updateRankings)();
        }
        else {
            return res.status(404).json({ message: "Aucun point commun trouvé." });
        }
        res.status(200).json({ commonContents, scoreUpdate });
    }
    catch (error) {
        res.status(500).json({ error: `Erreur du serveur: ${error.message}` });
    }
});
exports.compareSelectUser = compareSelectUser;
const selectUserController = {
    createSelectionsForUser: exports.createSelectionsForUser,
    compareSelectUser: exports.compareSelectUser,
};
exports.selectUserController = selectUserController;
//# sourceMappingURL=selectUserController.js.map