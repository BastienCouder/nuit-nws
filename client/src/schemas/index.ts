import { z } from "zod";

export const userSchema = z.object({
  nom: z.string(),
  prenom: z.string(),
  email: z.string().email(),
  tel: z.string().optional(),
  entreprise: z.string().optional(),
  poste: z.string().optional(),
  role: z.string().default("user"),
  score: z.number().default(0),
  dateInscription: z.date().default(new Date()),
  qrCodeUrl: z.string(),
  qrToken: z.string(),
  sessions: z.array(z.string()),
  lastLoginAt: z.date().optional(),
});

export const responseSchema = z.object({
  idQuestion: z.string(),
  idUtilisateur: z.string(),
  contenu: z.array(z.string()),
  dateReponse: z.date().default(new Date()),
});

export const questionSchema = z.object({
  reponseCorrecte: z.array(z.string()),
  idCreateur: z.string(),
  dateCreation: z.date().default(new Date()),
});

export const rankSchema = z.object({
  idUtilisateur: z.string(),
  score: z.number(),
  position: z.number(),
});

export const qualitySchema = z.object({
  name: z.string(),
});
