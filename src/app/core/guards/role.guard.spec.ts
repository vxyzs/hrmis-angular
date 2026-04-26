import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { RoleGuard } from './role.guard';
import { AuthService } from '../services/auth.service';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getRole']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: spy }
      ]
    });

    guard = TestBed.get(RoleGuard);
    authServiceSpy = TestBed.get(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('Admin access', () => {
    it('should allow access if user is Admin and route allows Admin', () => {
      authServiceSpy.getRole.and.returnValue('Admin');
      const route = new ActivatedRouteSnapshot();
      route.data = { roles: ['Admin', 'HRManager'] };

      const result = guard.canActivate(route);

      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('HR Manager restricted access', () => {
    it('should block HR Manager from Admin-only routes and redirect to unauthorized', () => {
      authServiceSpy.getRole.and.returnValue('HRManager');
      const route = new ActivatedRouteSnapshot();
      route.data = { roles: ['Admin'] }; // Only Admin allowed

      const result = guard.canActivate(route);

      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/unauthorized']);
    });

    it('should allow HR Manager to HRManager routes', () => {
      authServiceSpy.getRole.and.returnValue('HRManager');
      const route = new ActivatedRouteSnapshot();
      route.data = { roles: ['Admin', 'HRManager'] };

      const result = guard.canActivate(route);

      expect(result).toBe(true);
    });
  });

  describe('Employee blocked from admin routes', () => {
    it('should block Employee from Admin routes and redirect to profile', () => {
      authServiceSpy.getRole.and.returnValue('Employee');
      const route = new ActivatedRouteSnapshot();
      route.data = { roles: ['Admin', 'HRManager'] };

      const result = guard.canActivate(route);

      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/profile']);
    });
  });
});
