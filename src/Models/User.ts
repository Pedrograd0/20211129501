export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdDate: Date;
    role: RoleType;
    isActive: boolean;
  }
  
  export enum RoleType {
    Admin = 1,
    User = 0,
  }