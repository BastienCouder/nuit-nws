export interface UserDetails {
    id:string;
    nom: string;
    prenom: string;
    email: string;
    tel: string;
    entreprise:string;
    poste:string;
    score:number;
  }

  export interface Ranking {
    id:string;
    idUtilisateur: UserDetails;
    score: number;
    position: number;
  }