import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Department } from '../../shared/models';
import { EmployeeService } from './employee.service';
import { map, tap } from 'rxjs/operators';
import { ActivityLogService } from './activity-log.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'api/departments';

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeService,
    private activityLogService: ActivityLogService
  ) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartment(id: number): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  addDepartment(department: Department): Observable<Department> {
    // Set default values if not provided
    const departmentToAdd = {
      ...department,
      budget: department.budget || 0,
      description: department.description || ''
    };
    return this.http.post<Department>(this.apiUrl, departmentToAdd).pipe(
      tap(newDept => this.activityLogService.log('Department', 'Create', `Added department: ${newDept.name}`))
    );
  }

  updateDepartment(department: Department): Observable<any> {
    return this.http.put(`${this.apiUrl}/${department.id}`, department).pipe(
      tap(() => this.activityLogService.log('Department', 'Update', `Updated department: ${department.name}`))
    );
  }

  deleteDepartment(id: number): Observable<Department> {
    return this.http.delete<Department>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.activityLogService.log('Department', 'Delete', `Deleted department with ID: ${id}`))
    );
  }

  // Get departments with their managers
  getDepartmentsWithManagers(): Observable<(Department & { managerName: string })[]> {
    return forkJoin([
      this.getDepartments(),
      this.employeeService.getEmployees()
    ]).pipe(
      map(([departments, employees]) => {
        return departments.map(dept => {
          const manager = dept.managerId ? employees.find(e => e.id === dept.managerId) : null;
          return {
            ...dept,
            managerName: manager ? manager.name : 'Not assigned'
          };
        });
      })
    );
  }
}