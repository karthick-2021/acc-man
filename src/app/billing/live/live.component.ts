import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingServiceService } from '../billing-service.service';
import { LiveBilling } from '../models/LiveBilling';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {

  tableHeaders = ['#', 'Product', 'Quantity', 'Price', 'Total'];
  dataSource: LiveBilling[] = [];

  index = 1;
  total = 0;
  grandTotal = 0;
  tax = 18;

  constructor(public billingService: BillingServiceService) { }

  ngOnInit(): void {
    this.dataSource = [ new LiveBilling(this.index++) ];
  }

  addNewRow(value: LiveBilling) {
    this.dataSource.push(new LiveBilling(this.index++))
    this.setGrandTotal()
  }

  getSubTotal(value: LiveBilling): any {
    value.total = value && value.price && value.quantity && (value.price * value.quantity);
    return value.total; 
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
    this.grandTotal = this.total;
    this.grandTotal += this.total * (this.tax / 100);
  }
}

