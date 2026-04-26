import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivityLog } from '../../shared/models/activity-log.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private apiUrl = 'api/activityLogs';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getLogs(): Observable<ActivityLog[]> {
    return this.http.get<ActivityLog[]>(this.apiUrl);
  }

  log(entity: string, action: 'Create' | 'Update' | 'Delete', details: string): void {
    const user = this.authService.getCurrentUser();
    const performedBy = user ? `${user.name} (${user.role})` : 'System';
    
    const logEntry: Partial<ActivityLog> = {
      timestamp: new Date(),
      entity,
      action,
      performedBy,
      details
    };

    // We use a fire-and-forget approach for logging to not block UI
    this.http.post<ActivityLog>(this.apiUrl, logEntry).subscribe();
  }
}
