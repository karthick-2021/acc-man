import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BillingServiceService } from '../services/billing-service.service';
import { LiveBilling } from '../models/LiveBilling';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { StaticDataService } from '../services/static-data.service';
import * as _ from 'lodash';
import * as converter from 'number-to-words';
import { Invoice } from '../models/Invoice';
import { Inventory } from '../models/Inventory';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from '../shared/components/dialog-alert/dialog-alert.component';


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

  inventory: Inventory[] = [];
  custName = '';
  custEmail = '';
  custMobile = 9;
  invoiceNo = 0;
  hoverData = 0;
  date = new Date();
  today = this.date.getDate() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear();

  constructor(public billingService: BillingServiceService, public staticData: StaticDataService, public dialog: MatDialog, public service: BillingServiceService) { }

  ngOnInit(): void {
    this.clear();
    // this.inventory = this.staticData.getInventory();
    // this.products = _.map(this.inventory, 'product');

    this.billingService.getInventory().subscribe((a: Inventory[]) => {
      if (a.length > 0)
      {
        this.inventory = a;
        this.products = _.map(this.inventory, 'product');
      }
    })
    this.billingService.getGreet('Karthick').subscribe(a => {
      console.log('inside : ' + a);
    })
    this.billingService.getAllInvoices().subscribe((historical: Invoice[]) => {
      historical.forEach(a => this.invoiceNo = a.invoiceNo)
      this.invoiceNo++;
    })
   
  }

  clear() {
    this.dataSource = [new LiveBilling(this.index++)];
  }

  submit() {
    let index = 0;
    this.dataSource.forEach(a => a.sno = index++)
    this.dataSource.pop()
    console.log('Sending to backend')
    console.log(this.dataSource)
    // date = new Date().toUTCString();
    let invoice = new Invoice(this.invoiceNo, this.custMobile, this.custName, this.custEmail, new Date().toLocaleString(), this.dataSource, this.amountInWords(), this.grandTotal);
    console.log(invoice)
    this.billingService.saveBilling(invoice)
      .subscribe(a => {
        const dialogRef = this.dialog.open(DialogAlertComponent, { width: "30%", data: a });

        dialogRef.afterClosed().subscribe(result => {
          this.clear();
        });
      });
  }
  displayDelete(value: LiveBilling) {
    this.hoverData = value.sno;
  }

  isDisplay(value: LiveBilling): any {
    return value && value.sno && value.sno === this.hoverData;
  }

  deleteItem(value: LiveBilling) {
    value && value.product && _.remove(this.dataSource, value)
  }

  getIndex(value: LiveBilling): number {
    return _.findIndex(this.dataSource, value) + 1;
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

