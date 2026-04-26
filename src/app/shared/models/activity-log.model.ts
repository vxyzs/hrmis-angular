export interface ActivityLog {
  id: number;
  timestamp: string | Date;
  entity: string;
  action: 'Create' | 'Update' | 'Delete';
  performedBy: string; // Name or Role
  details: string;
}
