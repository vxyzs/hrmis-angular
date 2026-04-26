import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized-container">
      <mat-card class="unauthorized-card">
        <mat-card-header>
          <mat-card-title>Unauthorized Access</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>You do not have permission to view this page.</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/dashboard">Back to Dashboard</button>
          <button mat-button color="warn" (click)="logout()">Logout</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .unauthorized-card {
      width: 400px;
      padding: 20px;
      text-align: center;
    }
  `]
})
export class UnauthorizedComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
