import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  loginFailed = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.navigateBasedOnRole();
    }
  }

  private navigateBasedOnRole() {
    const role = this.authService.getRole();
    if (role === 'Employee') {
      this.router.navigate(['/profile']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    if (!this.username || !this.password) {
      return;
    }
    
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.loginFailed = false;
        this.navigateBasedOnRole();
      } else {
        this.loginFailed = true;
      }
    });
  }
}
