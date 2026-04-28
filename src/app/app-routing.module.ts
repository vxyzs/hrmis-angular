// Force Webpack re-compile
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UnauthorizedComponent } from './features/auth/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'HRManager'] }
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Employee'] }
  },
  {
    path: 'employees',
    loadChildren: () => import('./features/employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'HRManager'] }
  },
  {
    path: 'departments',
    loadChildren: () => import('./features/departments/departments.module').then(m => m.DepartmentsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'HRManager'] }
  },
  {
    path: 'candidates',
    loadChildren: () => import('./features/candidates/candidates.module').then(m => m.CandidatesModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'HRManager'] }
  },
  {
    path: 'salaries',
    loadChildren: () => import('./features/salaries/salaries.module').then(m => m.SalariesModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'HRManager'] }
  },
  {
    path: 'reports',
    loadChildren: () => import('./features/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin', 'HRManager'] }
  },
  {
    path: 'audit-log',
    loadChildren: () => import('./features/audit-log/audit-log.module').then(m => m.AuditLogModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] }
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }