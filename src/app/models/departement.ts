// departement.ts
export class Departement {
    // Propriétés du modèle
    latitude: number;
    longitude: number;
    nom: string;
    num: number;
  
    // Constructeur
    constructor(latitude: number, longitude: number, nom: string, num: number) {
      this.latitude = latitude;
      this.longitude = longitude;
      this.nom = nom;
      this.num = num;
    }
  }
  