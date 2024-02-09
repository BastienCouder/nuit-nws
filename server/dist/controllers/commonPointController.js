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
exports.commonPointController = exports.deleteCommonPoint = exports.updateCommonPoint = exports.readCommonPoints = exports.createCommonPoint = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const createCommonPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contenu } = req.body;
    if (!contenu) {
        return res
            .status(400)
            .json({ message: "Le contenu est requis." });
    }
    try {
        const newCommonPoint = yield prisma_1.default.commonPoint.create({
            data: { contenu },
        });
        res.status(201).json(newCommonPoint);
    }
    catch (error) {
        console.error("Erreur lors de la création du point commun :", error);
        res.status(500).json({ message: "Erreur lors de la création du point commun." });
    }
});
exports.createCommonPoint = createCommonPoint;
const readCommonPoints = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const commonPoints = yield prisma_1.default.commonPoint.findMany();
        res.status(200).json(commonPoints);
    }
    catch (error) {
        console.error("Erreur lors de la récupération des points communs :", error);
        res.status(500).json({ message: "Erreur lors de la récupération des points communs." });
    }
});
exports.readCommonPoints = readCommonPoints;
const updateCommonPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, contenu } = req.body;
    if (!contenu) {
        return res
            .status(400)
            .json({ message: "Le contenu est requis pour la mise à jour." });
    }
    try {
        const updatedCommonPoint = yield prisma_1.default.commonPoint.update({
            where: { id: Number(id) },
            data: { contenu },
        });
        res.status(200).json(updatedCommonPoint);
    }
    catch (error) {
        console.error("Erreur lors de la mise à jour du point commun :", error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du point commun." });
    }
});
exports.updateCommonPoint = updateCommonPoint;
const deleteCommonPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield prisma_1.default.commonPoint.delete({
            where: { id: Number(id) },
        });
        res.status(200).json({ message: "Point commun supprimé avec succès." });
    }
    catch (error) {
        console.error("Erreur lors de la suppression du point commun :", error);
        res.status(500).json({ message: "Erreur lors de la suppression du point commun." });
    }
});
exports.deleteCommonPoint = deleteCommonPoint;
const commonPointController = {
    createCommonPoint: exports.createCommonPoint,
    readCommonPoints: exports.readCommonPoints,
    updateCommonPoint: exports.updateCommonPoint,
    deleteCommonPoint: exports.deleteCommonPoint,
};
exports.commonPointController = commonPointController;
//# sourceMappingURL=commonPointController.js.map