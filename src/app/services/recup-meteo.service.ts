import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class RecupMeteoService {

  private url = 'http://127.0.0.1:8000';
  private endpointdep = '/meteodata/get/';

  // private departements:Meteo[] = new Array<meteo>;
  
  constructor(private http: HttpClient) {}

  // format date: AAAAMMDD
  getMeteoDepAnnee(dep: number, annee: number) {
    return this.http.get<any[]>(this.url + this.endpointdep + dep + "/" + (annee-1) + "0101/" + annee + "0101");
  }

  getMeteoPrediction(dep: number, date: string){
    return this.http.get<any>(this.url + "/prediction/get/" + dep + "/" + date);
  }

  getActivities(json: any){
    return this.http.post<any>(this.url + "/activities/getbyprediction", json);
  }
  


}
