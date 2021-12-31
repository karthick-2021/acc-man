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

  getGreet(name: string): Observable<string> {
   
    return this.http.post('/api/greet', name, { responseType: 'text'});
  }

  saveBilling(value: Invoice): Observable<string> {
    return this.http.post('/api/saveBilling', value, { responseType: 'text'})
  }
  
  getAllInvoices(): Observable<any> {
    return this.http.post('/api/getHistorical', { responseType: 'any'})
  }

  getInventory(): Observable<any> {
    return this.http.post('/api/getInventory', { responseType: 'any'})
  }

  saveInventory(value: Inventory): Observable<string> {
    return this.http.post('/api/saveInventory', value, { responseType: 'text'})
  }
}
