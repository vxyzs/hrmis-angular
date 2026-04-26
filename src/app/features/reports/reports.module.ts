// Force Webpack re-compile for material module updates
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsDashboardComponent } from './reports-dashboard/reports-dashboard.component';

@NgModule({
  declarations: [ReportsDashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
