import { CommonPoint } from "@prisma/client";
import prisma from "../config/prisma";
import { Request, Response } from "express";

export const createCommonPoint = async (req: Request, res: Response) => {
  const { contenu } = req.body;

  if (!contenu) {
    return res.status(400).json({ message: "Le contenu est requis." });
  }

  try {
    const newCommonPoint: CommonPoint = await prisma.commonPoint.create({
      data: { contenu },
    });
    res.status(201).json(newCommonPoint);
  } catch (error) {
    console.error("Erreur lors de la création du point commun :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création du point commun." });
  }
};

export const readCommonPoints = async (req: Request, res: Response) => {
  try {
    const commonPoints: CommonPoint[] = await prisma.commonPoint.findMany();
    res.status(200).json(commonPoints);
  } catch (error) {
    console.error("Erreur lors de la récupération des points communs :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des points communs." });
  }
};

export const updateCommonPoint = async (req: Request, res: Response) => {
  const { id, contenu } = req.body;

  if (!contenu) {
    return res
      .status(400)
      .json({ message: "Le contenu est requis pour la mise à jour." });
  }

  try {
    const updatedCommonPoint: CommonPoint = await prisma.commonPoint.update({
      where: { id: Number(id) },
      data: { contenu },
    });
    res.status(200).json(updatedCommonPoint);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du point commun :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du point commun." });
  }
};

export const deleteCommonPoint = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    await prisma.commonPoint.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Point commun supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du point commun :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du point commun." });
  }
};

const commonPointController = {
  createCommonPoint,
  readCommonPoints,
  updateCommonPoint,
  deleteCommonPoint,
};

export { commonPointController };
