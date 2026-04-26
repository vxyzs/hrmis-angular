import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ActivityLogService } from '../../../core/services/activity-log.service';
import { ActivityLog } from '../../../shared/models/activity-log.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-audit-log-list',
  templateUrl: './audit-log-list.component.html',
  styleUrls: ['./audit-log-list.component.scss']
})
export class AuditLogListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['timestamp', 'entity', 'action', 'performedBy', 'details'];
  dataSource = new MatTableDataSource<ActivityLog>();
  isLoading = false;

  // Filters
  entityFilter = new FormControl('');
  actionFilter = new FormControl('');
  
  entities: string[] = ['Employee', 'Department', 'Candidate', 'Salary', 'System'];
  actions: string[] = ['Create', 'Update', 'Delete'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(private activityLogService: ActivityLogService) { }

  ngOnInit(): void {
    this.loadLogs();
    
    this.entityFilter.valueChanges.subscribe(() => this.applyFilters());
    this.actionFilter.valueChanges.subscribe(() => this.applyFilters());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadLogs(): void {
    this.isLoading = true;
    this.activityLogService.getLogs()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (logs) => {
          this.dataSource.data = logs.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        }
      });
  }

  applyFilters(): void {
    const entity = this.entityFilter.value;
    const action = this.actionFilter.value;

    this.dataSource.filterPredicate = (data: ActivityLog, filter: string) => {
      const searchTerms = JSON.parse(filter);
      return (!searchTerms.entity || data.entity === searchTerms.entity) &&
             (!searchTerms.action || data.action === searchTerms.action);
    };

    this.dataSource.filter = JSON.stringify({ entity, action });

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetFilters(): void {
    this.entityFilter.setValue('');
    this.actionFilter.setValue('');
  }
}
