import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivityLogService } from './activity-log.service';
import { AuthService } from './auth.service';
import { User } from '../../shared/models/auth.model';

describe('ActivityLogService', () => {
  let service: ActivityLogService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const mockUser: User = {
    id: 1,
    username: 'admin',
    password: 'password',
    role: 'Admin',
    name: 'Admin User'
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getCurrentUser']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ActivityLogService,
        { provide: AuthService, useValue: spy }
      ]
    });

    service = TestBed.get(ActivityLogService);
    httpMock = TestBed.get(HttpTestingController);
    authServiceSpy = TestBed.get(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('logging actions', () => {
    it('should log create action with current user', () => {
      authServiceSpy.getCurrentUser.and.returnValue(mockUser);
      
      service.log('Employee', 'Create', 'Added new employee');
      
      const req = httpMock.expectOne('api/activityLogs');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.entity).toBe('Employee');
      expect(req.request.body.action).toBe('Create');
      expect(req.request.body.details).toBe('Added new employee');
      expect(req.request.body.performedBy).toBe('Admin User (Admin)');
      req.flush({});
    });

    it('should log update action with system if no user', () => {
      authServiceSpy.getCurrentUser.and.returnValue(null);
      
      service.log('Department', 'Update', 'Updated department name');
      
      const req = httpMock.expectOne('api/activityLogs');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.entity).toBe('Department');
      expect(req.request.body.action).toBe('Update');
      expect(req.request.body.details).toBe('Updated department name');
      expect(req.request.body.performedBy).toBe('System');
      req.flush({});
    });

    it('should log delete action', () => {
      authServiceSpy.getCurrentUser.and.returnValue(mockUser);
      
      service.log('Candidate', 'Delete', 'Removed candidate');
      
      const req = httpMock.expectOne('api/activityLogs');
      expect(req.request.method).toBe('POST');
      expect(req.request.body.action).toBe('Delete');
      req.flush({});
    });
  });

  describe('timestamp generation', () => {
    it('should generate a valid timestamp close to current time', () => {
      authServiceSpy.getCurrentUser.and.returnValue(mockUser);
      
      const beforeTime = new Date().getTime();
      service.log('Salary', 'Create', 'Test timestamp');
      const afterTime = new Date().getTime();
      
      const req = httpMock.expectOne('api/activityLogs');
      const timestamp = req.request.body.timestamp as Date;
      
      expect(timestamp).toBeTruthy();
      expect(timestamp.getTime()).toBeGreaterThanOrEqual(beforeTime);
      expect(timestamp.getTime()).toBeLessThanOrEqual(afterTime);
      
      req.flush({});
    });
  });
});
