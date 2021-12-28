import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'acc-man';
  selectedTab = '';
  tabs = [
    {'title': 'Billing', 'page' : 'live-billings'},
    {'title': 'Historical', 'page' : 'historical'},
    {'title': 'Warehouse', 'page' : 'warehouse'}
  ];

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.selectedTab = this.tabs[0].page;
  }

  toggleTab(value: any) {
    this.selectedTab = value;
    this.router.navigate([value]);
  }
}
