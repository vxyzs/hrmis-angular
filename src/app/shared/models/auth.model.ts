export enum Role {
  Admin = 'Admin',
  HRManager = 'HRManager',
  Employee = 'Employee'
}

export interface User {
  id: number;
  username: string;
  password?: string;
  role: Role | string;
  name: string;
  employeeId?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}
