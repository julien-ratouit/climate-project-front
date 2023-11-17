import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecupMeteoService {

  private url = 'http://127.0.0.1:5000';
  private endpointdep = '/departement/getall';
  
  constructor(private http: HttpClient) {}

  getMeteo(){
    return this.http.get(this.url + this.endpointdep);
  }
}
