import { Answer } from "./Answer";
import { Question } from "./Question";
import { User } from "./User";

export interface UserAnswer {
    id: number;
    answerId: number;
    answer?: Answer;
    questionId: number;
    question?: Question;
    userId: number;
    user?: User;
    answerDate: Date;
  }