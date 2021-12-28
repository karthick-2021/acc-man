import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveComponent } from './billing/live/live.component';

const routes: Routes = [
  { path: '', component: LiveComponent },
  { path: 'live-billings', component: LiveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
