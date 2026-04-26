// Force Webpack re-compile for reports-dashboard
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsDashboardComponent } from './reports-dashboard/reports-dashboard.component';

const routes: Routes = [
  { path: '', component: ReportsDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
