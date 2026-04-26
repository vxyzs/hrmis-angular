import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { ActivityLogService } from './activity-log.service';
import { Employee } from '../../shared/models';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;
  let activityLogServiceSpy: jasmine.SpyObj<ActivityLogService>;

  const mockEmployee: Employee = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    departmentId: 1,
    position: 'Developer',
    hireDate: '2023-01-01',
    status: 'Active'
  };

  beforeEach(() => {
    const logSpy = jasmine.createSpyObj('ActivityLogService', ['log']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EmployeeService,
        { provide: ActivityLogService, useValue: logSpy }
      ]
    });

    service = TestBed.get(EmployeeService);
    httpMock = TestBed.get(HttpTestingController);
    activityLogServiceSpy = TestBed.get(ActivityLogService) as jasmine.SpyObj<ActivityLogService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get employees', () => {
    it('should retrieve all employees via GET', () => {
      const mockEmployees: Employee[] = [mockEmployee];

      service.getEmployees().subscribe(employees => {
        expect(employees.length).toBe(1);
        expect(employees).toEqual(mockEmployees);
      });

      const req = httpMock.expectOne('api/employees');
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees);
    });
  });

  describe('add employee', () => {
    it('should add an employee via POST and log activity', () => {
      const newEmployee = { ...mockEmployee };
      delete (newEmployee as any).id;

      service.addEmployee(newEmployee).subscribe(employee => {
        expect(employee).toEqual(mockEmployee);
      });

      const req = httpMock.expectOne('api/employees');
      expect(req.request.method).toBe('POST');
      req.flush(mockEmployee);

      expect(activityLogServiceSpy.log).toHaveBeenCalledWith(
        'Employee',
        'Create',
        `Added employee: ${mockEmployee.name}`
      );
    });
  });

  describe('update employee', () => {
    it('should update an employee via PUT and log activity', () => {
      service.updateEmployee(mockEmployee).subscribe(res => {
        expect(res).toBeTruthy();
      });

      const req = httpMock.expectOne(`api/employees/${mockEmployee.id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(mockEmployee);

      expect(activityLogServiceSpy.log).toHaveBeenCalledWith(
        'Employee',
        'Update',
        `Updated employee: ${mockEmployee.name}`
      );
    });
  });

  describe('delete employee', () => {
    it('should delete an employee via DELETE and log activity', () => {
      service.deleteEmployee(mockEmployee.id).subscribe(res => {
        expect(res).toBeTruthy();
      });

      const req = httpMock.expectOne(`api/employees/${mockEmployee.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockEmployee);

      expect(activityLogServiceSpy.log).toHaveBeenCalledWith(
        'Employee',
        'Delete',
        `Deleted employee with ID: ${mockEmployee.id}`
      );
    });
  });

  describe('employee filtering', () => {
    it('should filter employees by search term via GET', () => {
      const searchTerm = 'John';
      const mockEmployees: Employee[] = [mockEmployee];

      service.searchEmployees(searchTerm).subscribe(employees => {
        expect(employees.length).toBe(1);
        expect(employees).toEqual(mockEmployees);
      });

      const req = httpMock.expectOne(`api/employees?q=${searchTerm}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEmployees);
    });
  });
});
