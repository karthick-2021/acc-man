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
import { HttpClientModule } from '@angular/common/http';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';
import { MatDialogModule} from '@angular/material/dialog';
import { AddNewItemComponent } from './warehouse/add-new-item/add-new-item.component';
import { DialogAlertComponent } from './shared/components/dialog-alert/dialog-alert.component';



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
    WarehouseComponent,
    DialogBoxComponent,
    AddNewItemComponent,
    DialogAlertComponent
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
    HttpClientModule,
    MatDialogModule,
    RouterModule.forChild(ROUTES),
  ],
  exports: [LiveComponent],
})
export class BillingModule { }
