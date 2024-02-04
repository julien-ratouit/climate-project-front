import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Departement } from '../models/departement';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecupDepartementService {
  private url = 'http://127.0.0.1:8000';
  private endpointdep = '/departement/getall';

  private departements:Departement[] = new Array<Departement>;
  
  constructor(private http: HttpClient) {}

  loadDepartements() {
    return this.http.get<any[]>(this.url + this.endpointdep).pipe(
      map((rep: any) => {
        this.departements = rep.map((departementJson: { avg_latitude: number; avg_longitude: number; nom_departement: string; num_departement: number; }) => new Departement(
          departementJson.avg_latitude,
          departementJson.avg_longitude,
          departementJson.nom_departement,
          departementJson.num_departement
        ));
        return true; // Retourne true si la requête réussit
      }),
      catchError((error) => {
        console.error('Erreur lors de la requête API:', error);
        return of(false); // Retourne false en cas d'erreur
      })
    );
  }

  getDepartements(): Departement[]{
    return this.departements;
  }
}
