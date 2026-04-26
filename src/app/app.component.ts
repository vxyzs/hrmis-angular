// Force Webpack re-compile
import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Observable } from 'rxjs';
import { User, Role } from './shared/models/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hr-app';
  currentUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
  }

  hasAccess(allowedRoles: string[]): boolean {
    const role = this.authService.getRole() as string;
    return allowedRoles.includes(role);
  }
}
