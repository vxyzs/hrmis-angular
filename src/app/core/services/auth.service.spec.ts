import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from '../../shared/models/auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  const mockUsers: User[] = [
    { id: 1, username: 'admin', password: 'admin123', role: 'Admin', name: 'Admin User' },
    { id: 2, username: 'hr.manager', password: 'hr123', role: 'HRManager', name: 'HR Manager' }
  ];

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.removeItem('currentUser');
    
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    
    // Spy on router navigate
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return true and set session on successful login', () => {
      let result = false;
      service.login('admin', 'admin123').subscribe(res => {
        result = res;
      });

      const req = httpMock.expectOne('api/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);

      expect(result).toBe(true);
      expect(service.isLoggedIn()).toBe(true);
      const currentUser = service.getCurrentUser();
      expect(currentUser && currentUser.username).toBe('admin');
      
      const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      expect(storedUser.username).toBe('admin');
    });

    it('should return false on invalid login', () => {
      let result = true;
      service.login('admin', 'wrongpassword').subscribe(res => {
        result = res;
      });

      const req = httpMock.expectOne('api/users');
      req.flush(mockUsers);

      expect(result).toBe(false);
      expect(service.isLoggedIn()).toBe(false);
      expect(localStorage.getItem('currentUser')).toBeNull();
    });
  });

  describe('logout', () => {
    it('should clear session and navigate to login', () => {
      // Setup initial state
      localStorage.setItem('currentUser', JSON.stringify(mockUsers[0]));
      // Re-initialize service to pick up localStorage
      const serviceWithSession = new AuthService(TestBed.get(HttpClientTestingModule), router);
      
      serviceWithSession.logout();
      
      expect(localStorage.getItem('currentUser')).toBeNull();
      expect(serviceWithSession.isLoggedIn()).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('role retrieval', () => {
    it('should return correct role for logged in user', () => {
      localStorage.setItem('currentUser', JSON.stringify(mockUsers[0]));
      // Re-initialize to pick up state
      const serviceWithSession = new AuthService(TestBed.get(HttpClientTestingModule), router);
      
      expect(serviceWithSession.getRole()).toBe('Admin');
    });

    it('should return null if no user is logged in', () => {
      expect(service.getRole()).toBeNull();
    });
  });

  describe('session persistence', () => {
    it('should load user from localStorage on initialization', () => {
      localStorage.setItem('currentUser', JSON.stringify(mockUsers[1]));
      
      const newService = new AuthService(TestBed.get(HttpClientTestingModule), router);
      
      expect(newService.isLoggedIn()).toBe(true);
      const currentUser = newService.getCurrentUser();
      expect(currentUser && currentUser.username).toBe('hr.manager');
    });
  });
});
