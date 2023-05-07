import { User } from "./User";

export interface UserPoint {
    id: number;
    userId: number;
    user?: User;
    totalPoint: number;
  }