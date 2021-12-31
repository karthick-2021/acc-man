import { Component, OnInit } from '@angular/core';
import { Invoice } from '../models/Invoice';
import { BillingServiceService } from '../services/billing-service.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogBoxComponent } from '../shared/dialog-box/dialog-box.component';
@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit {

  invoices: Invoice[] = [];
  tableHeaders = ['Invoice', 'Date', 'Name', 'Mobile', 'Email', 'Total', 'Actions'];
  isDisplay = false;
  constructor(private billingService: BillingServiceService, public dialog: MatDialog, public service: BillingServiceService) { }

  ngOnInit(): void {
    this.billingService.getAllInvoices().subscribe((historical: Invoice[]) => {
      this.invoices = historical;
    })
  }

  openDialog(value: Invoice) {
    this.dialog.open(DialogBoxComponent, { width: "70%", data: value });
  }
}
