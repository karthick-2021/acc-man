import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../../models/Invoice';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  invoice: Invoice | undefined;
  tableHeaders = ['#', 'Product', 'Quantity', 'MRP', 'Tax', 'Total'];

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: Invoice) { 
    this.invoice = data;
  }

  ngOnInit(): void {

  }

  getsno(value: number): number {
    return value += 1;
  }
}
