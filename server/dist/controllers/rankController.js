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
exports.RankController = exports.getRankings = exports.updateRankings = exports.readUserRank = exports.createRank = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, score } = req.body;
    try {
        const rank = yield prisma_1.default.rank.create({
            data: {
                userId,
                score,
                position: 0,
            },
        });
        res.status(201).json({ message: "Classement créé avec succès.", rank });
    }
    catch (error) {
        console.error("Erreur lors de la création du classement :", error);
        res.status(500).json({ error: "Erreur lors de la création du classement." });
    }
});
exports.createRank = createRank;
const readUserRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const userRank = yield prisma_1.default.rank.findUnique({
            where: { userId: userId },
        });
        if (!userRank) {
            return res.status(404).json({ message: "Utilisateur non trouvé dans le classement." });
        }
        res.status(200).json(userRank);
    }
    catch (error) {
        console.error("Erreur lors de la lecture du classement de l'utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la lecture du classement de l'utilisateur." });
    }
});
exports.readUserRank = readUserRank;
const updateRankings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany({
            orderBy: {
                score: 'desc',
            },
        });
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const position = i + 1;
            yield prisma_1.default.rank.upsert({
                where: {
                    userId: user.id,
                },
                update: {
                    score: user.score,
                    position,
                },
                create: {
                    userId: user.id,
                    score: user.score,
                    position,
                },
            });
        }
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour du classement :", error);
    }
});
exports.updateRankings = updateRankings;
const getRankings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rankings = yield prisma_1.default.rank.findMany({
            orderBy: {
                position: 'asc',
            },
            include: { user: true, }
        });
        res.status(200).json(rankings);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des classements :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des classements." });
    }
});
exports.getRankings = getRankings;
const RankController = {
    createRank: exports.createRank,
    readUserRank: exports.readUserRank,
    updateRankings: exports.updateRankings,
    getRankings: exports.getRankings,
};
exports.RankController = RankController;
//# sourceMappingURL=rankController.js.map