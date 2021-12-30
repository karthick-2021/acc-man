import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BillingServiceService } from '../services/billing-service.service';
import { LiveBilling } from '../models/LiveBilling';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { StaticDataService } from '../services/static-data.service';
import * as _ from 'lodash';
import * as converter from 'number-to-words';


@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  tableHeaders = ['#', 'Product', 'Quantity', 'MRP', 'Tax', 'Total'];
  dataSource: LiveBilling[] = [];

  index = 1;
  total = 0;
  grandTotal = 0;
  tax = 18;

  control = new FormControl();
  products: any[] = [];
  filteredStreets: Observable<string[]> | undefined;

  inventory: LiveBilling[] = [];
  custName = '';
  custEmail = '';
  custMobile = '';

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.products.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  constructor(public billingService: BillingServiceService, public staticData: StaticDataService) { }

  ngOnInit(): void {
    this.dataSource = [new LiveBilling(this.index++)];
    this.inventory = this.staticData.getInventory();
    this.products = _.map(this.inventory, 'product');
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  addItem(value: LiveBilling) {
    if (value) {
      let inventory = this.inventory.filter(a => a.product === value.product)[0];
      value.price = inventory && inventory.price;
      value.quantity = inventory && inventory.quantity;
      value.tax = inventory && inventory.tax;
      this.insertRow(value);
    }
  }

  getQty(product: string): any {
    console.log(this.inventory.filter(a => a.product === product));
    return '';
  }

  insertRow(value: LiveBilling) {
    if (this.dataSource.filter(a => !a.product).length == 0) {
      this.dataSource.push(new LiveBilling(this.index++))
      this.updateTotal(value)
    }
  }

  updateTotal(value: LiveBilling) {
    this.getSubTotal(value)
    this.setGrandTotal()
  }

  getSubTotal(value: LiveBilling): any {
    let subTotal = value && value.price && value.quantity && (value.price * value.quantity);
    if (value && value.tax) {
      subTotal = subTotal && subTotal + (subTotal * (value.tax / 100));
    }
    value.total = subTotal;
    return value.total?.toFixed(2);
  }

  setGrandTotal() {
    let temp = 0;
    if (this.dataSource) {
      this.dataSource.forEach(a => {
        if (a.total) {
          temp += a.total;
        }
      });
    }
    this.total = temp;
    this.grandTotal = _.round(this.total, 2)
  }

  amountInWords(): any {
    let inWords = ''
    if (this.grandTotal) {
      inWords = converter.toWords(this.grandTotal)
      inWords = inWords.charAt(0).toUpperCase() + inWords.slice(1);
    }
    return inWords 
  }

  setCustInfo() {
    this.custName = 'Karthick';
    this.custEmail = 'Karthick2021@gmail.com'
  }
}

