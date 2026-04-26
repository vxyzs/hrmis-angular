import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employee } from '../../shared/models';
import { ActivityLogService } from './activity-log.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'api/employees';

  constructor(private http: HttpClient, private activityLogService: ActivityLogService) { }

  // CREATE
  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee).pipe(
      tap(newEmp => this.activityLogService.log('Employee', 'Create', `Added employee: ${newEmp.name}`))
    );
  }

  // READ
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${employee.id}`, employee).pipe(
      tap(() => this.activityLogService.log('Employee', 'Update', `Updated employee: ${employee.name}`))
    );
  }
  // Search employees by name, email, or position
  searchEmployees(term: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?q=${term}`);
  }

  // DELETE
  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.activityLogService.log('Employee', 'Delete', `Deleted employee with ID: ${id}`))
    );
  }

  // EXTRA: Get employees by department
  getEmployeesByDepartment(departmentId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?departmentId=${departmentId}`);
  }
}