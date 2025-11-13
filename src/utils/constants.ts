export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGEMENT: 'management',
  TECH_LEAD: 'tech_lead',
  EMPLOYEE: 'employee'
} as const;

export const ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.MANAGEMENT]: 'Management',
  [USER_ROLES.TECH_LEAD]: 'Tech Lead',
  [USER_ROLES.EMPLOYEE]: 'Employee'
} as const;
