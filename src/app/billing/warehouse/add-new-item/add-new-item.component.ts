import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inventory } from '../../models/Inventory';
import { BillingServiceService } from '../../services/billing-service.service';

@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.scss']
})
export class AddNewItemComponent implements OnInit {

  labels = ['Product ID', 'Product', 'Quantity', 'Price', 'Tax']

  public productID?: string
  public product?: string
  public quantity?: number
  public price?: number
  public tax?: number

  dataSource?: Inventory[]

  constructor( public dialogRef: MatDialogRef<AddNewItemComponent>, private billingService: BillingServiceService ) { }

  ngOnInit(): void {
    this.clear();
  }

  clear() {
    this.dataSource = [new Inventory()];
  }

  addItem() {
    if (this.productID && this.product && this.quantity && this.price && this.tax) {

      this.insertItem(new Inventory(this.productID, this.product, this.quantity, this.price, this.tax))

      // let isExists = this.dataSource && this.dataSource.filter(a => a.pr)
      // let inventory = this.inventory.filter(a => a.product === value.product)[0];
      // value.price = inventory && inventory.price;
      // value.quantity = inventory && inventory.quantity;
      // value.tax = inventory && inventory.tax;
      // this.insertRow(value);
    }
  }

  insertItem(value: Inventory) {
    console.log(value)
    this.billingService.saveInventory(value).subscribe(a => {
      console.log(a)
      this.onNoClick();
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // insertRow(value: Inventory) {
  //   if (this.dataSource.filter(a => !a.product).length == 0) {
  //     this.dataSource.push(new LiveBilling(this.index++))
  //     this.updateTotal(value)
  //   }
  // }
}
