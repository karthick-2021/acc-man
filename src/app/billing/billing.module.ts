import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveComponent } from './live/live.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { HistoricalComponent } from './historical/historical.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon'




export const ROUTES: Routes = [
  { path: '', component: LiveComponent},
  { path: 'live-billings', component: LiveComponent},
  { path: 'historical', component: HistoricalComponent},
  { path: 'warehouse', component: WarehouseComponent},
]

@NgModule({
  declarations: [
    LiveComponent,
    HistoricalComponent,
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    MatGridListModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [LiveComponent],
})
export class BillingModule { }
