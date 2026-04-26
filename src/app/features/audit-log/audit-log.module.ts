import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { AuditLogRoutingModule } from './audit-log-routing.module';
import { AuditLogListComponent } from './audit-log-list/audit-log-list.component';

@NgModule({
  declarations: [AuditLogListComponent],
  imports: [
    CommonModule,
    AuditLogRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AuditLogModule { }
