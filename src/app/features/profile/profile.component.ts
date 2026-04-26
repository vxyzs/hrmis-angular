import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { EmployeeService } from '../../core/services/employee.service';
import { DepartmentService } from '../../core/services/department.service';
import { SalaryService } from '../../core/services/salary.service';
import { Employee } from '../../shared/models/employee.model';
import { Department } from '../../shared/models/department.model';
import { Salary } from '../../shared/models/salary.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  employee: Employee | null = null;
  department: Department | null = null;
  salary: Salary | null = null;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private salaryService: SalaryService
  ) { }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    
    if (user && user.employeeId) {
      this.employeeService.getEmployee(user.employeeId).subscribe(emp => {
        this.employee = emp;
        
        if (emp && emp.departmentId) {
          this.departmentService.getDepartment(emp.departmentId).subscribe(dept => {
            this.department = dept;
          });
        }

        this.salaryService.getSalaries().subscribe(salaries => {
          this.salary = salaries.find(s => s.employeeId === emp.id) || null;
          this.isLoading = false;
        });
      }, () => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
    }
  }
}
