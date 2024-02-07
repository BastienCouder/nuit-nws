// Types.ts

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  entreprise: string;
  poste: string;
  role: string;
  score: number;
  qrToken: string;
  sessions: Session[];
  ranks: Rank[];
  selections: SelectionUtilisateur[];
}

export interface Session {
  id: number;
  status: string;
  createdAt: Date;
  userId: number;
  user: User;
}

export interface CommonPoint {
  id: number;
  contenu: string;
  selections: SelectionUtilisateur[];
}

export interface Rank {
  id: number;
  userId: number;
  score: number;
  position: number;
  user: User;
}

export interface SelectionUtilisateur {
  id: number;
  userId: number;
  commonPointId: number;
  user: User;
  commonPoint: CommonPoint;
}

// État pour les points communs
export interface CommonPointsState {
  commonPoints: CommonPoint[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
