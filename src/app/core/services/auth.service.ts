// Force Webpack re-compile
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, Role } from '../../shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private readonly USER_KEY = 'currentUser';

  constructor(private http: HttpClient, private router: Router) {
    const savedUser = localStorage.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getCurrentUser(): User | null {
    return this.currentUserValue;
  }

  public getRole(): Role | string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  login(username: string, password?: string): Observable<boolean> {
    return this.http.get<User[]>('api/users').pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
