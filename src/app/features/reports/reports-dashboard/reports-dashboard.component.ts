import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee.service';
import { SalaryService } from '../../../core/services/salary.service';
import { CandidateService } from '../../../core/services/candidate.service';
import { ExportService } from '../../../core/services/export.service';
import { Employee } from '../../../shared/models/employee.model';
import { Salary } from '../../../shared/models/salary.model';
import { Candidate } from '../../../shared/models/candidate.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reports-dashboard',
  templateUrl: './reports-dashboard.component.html',
  styleUrls: ['./reports-dashboard.component.scss']
})
export class ReportsDashboardComponent implements OnInit {
  employees: Employee[] = [];
  salaries: Salary[] = [];
  candidates: Candidate[] = [];

  constructor(
    private employeeService: EmployeeService,
    private salaryService: SalaryService,
    private candidateService: CandidateService,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.employeeService.getEmployees(),
      this.salaryService.getSalaries(),
      this.candidateService.getCandidates()
    ]).subscribe(([emp, sal, cand]) => {
      this.employees = emp;
      this.salaries = sal;
      this.candidates = cand;
    });
  }

  exportHeadcount() {
    const data = this.employees.map(e => ({
      ID: e.id,
      Name: e.name,
      DepartmentID: e.departmentId,
      Position: e.position,
      HireDate: e.hireDate,
      Status: e.status
    }));
    this.exportService.downloadCSV(data, 'headcount_report.csv');
  }

  exportPayroll() {
    const data = this.salaries.map(s => ({
      SalaryID: s.id,
      EmployeeID: s.employeeId,
      BaseAmount: s.baseAmount,
      Bonus: s.bonus || 0,
      Total: s.baseAmount + (s.bonus || 0)
    }));
    this.exportService.downloadCSV(data, 'payroll_report.csv');
  }

  exportPipeline() {
    const data = this.candidates.map(c => ({
      CandidateID: c.id,
      Name: c.name,
      Position: c.appliedPosition,
      Status: c.status,
      ApplicationDate: c.applicationDate
    }));
    this.exportService.downloadCSV(data, 'pipeline_report.csv');
  }
}
