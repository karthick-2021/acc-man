import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Inventory } from '../models/Inventory';
import { LiveBilling } from '../models/LiveBilling';
import { BillingServiceService } from '../services/billing-service.service';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {

  tableHeaders = ['Product ID', 'Product', 'Quantity', 'Price', 'Total'];
  dataSource: Inventory[] = [];

  constructor(private billingService: BillingServiceService, public dialog: MatDialog, public service: BillingServiceService) { }

  ngOnInit(): void {
    this.billingService.getInventory().subscribe((inventory: Inventory[]) => {
      this.dataSource = inventory;
      console.log(this.dataSource)
    })
  }

  
  addItem() {
    const dialogRef = this.dialog.open(AddNewItemComponent, { width: "70%" });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
