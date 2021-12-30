import { Component, OnInit } from '@angular/core';
import { LiveBilling } from '../models/LiveBilling';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  tableHeaders = ['#', 'Product', 'Quantity', 'Price', 'Total'];
  dataSource: LiveBilling[] = [];

  index = 1;

  products: string[] = ['Milk 500 ml', 'Sugar 1 Kg', 'Britannia biscuits 100g', 'Apple 1 Kg'];

  constructor() { }

  ngOnInit(): void {
  }

}
