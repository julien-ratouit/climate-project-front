import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecupMeteoService {
  private url = "http://127.0.0.1:5000/";
  private endpoint = "departement/getAll";

  constructor(private http: HttpClient) {}

  getMeteo(){
    var header = new HttpHeaders()
    .set('Access-Control-Allow-Origin', 'http://127.0.0.1:4200/')
    .set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
    return this.http.get(this.url + this.endpoint, {'headers': header});
  }

}
