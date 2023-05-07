import { Answer } from "./Answer";
import { User } from "./User";

export interface Question {
    id: number;
    questionUser: string;
    userId: number;
    User?: User;
    createdDate: Date;
    questionActive: boolean;
    answers: Answer[];
  }