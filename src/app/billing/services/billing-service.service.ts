import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../models/Inventory';
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class BillingServiceService {

  constructor(private http: HttpClient) { }

  // url = 'http://localhost:8080';
  url = 'https://inv-mgr.herokuapp.com';
  getGreet(name: string): Observable<string> {
   
    return this.http.post(this.url + '/api/greet', name, { responseType: 'text'});
  }

  saveBilling(value: Invoice): Observable<string> {
    return this.http.post(this.url + '/api/saveBilling', value, { responseType: 'text'})
  }
  
  getAllInvoices(): Observable<any> {
    return this.http.post(this.url + '/api/getHistorical', { responseType: 'any'})
  }

  getInventory(): Observable<any> {
    return this.http.post(this.url + '/api/getInventory', { responseType: 'any'})
  }

  saveInventory(value: Inventory): Observable<string> {
    return this.http.post(this.url + '/api/saveInventory', value, { responseType: 'text'})
  }
}
