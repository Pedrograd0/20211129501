import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Answer } from 'src/Models/Answer';
import { Question } from 'src/Models/Question';
import { UserAnswer } from 'src/Models/UserAnswer';
import { UserPoint } from 'src/Models/UserPoint';
import { QuestionService } from 'src/Services/QuestionService';

@Component({
  selector: 'app-user-question-answer',
  templateUrl: './user-question-answer.component.html',
  styleUrls: ['./user-question-answer.component.scss']
})
export class UserQuestionAnswerComponent {
  questions: Question[]  = []
  selectedAnswers: UserAnswer[] = [];
  userId:number = 0
  constructor(private questionService: QuestionService) {
    var local = localStorage.getItem('user');
    this.userId = local ? JSON.parse(local).id : null;
   }

  ngOnInit(): void {
    this.questionService.list().subscribe(data => {
      this.questions = data;
    });
  }

  onSubmit(): void {
    
    var coutn =this.selectedAnswers.length;
    if(coutn == this.questions.length){

      this.selectedAnswers = [];
      console.log(coutn);
      this.questions.forEach(question => {
        const selectedAnswer = question.answers.find(answer => answer.id);
        if (selectedAnswer) {
          var model :UserAnswer = {
            answerDate : new Date(),
            answerId : selectedAnswer.id,
            id : 0,
            questionId : question.id,
            userId : this.userId,
          }
          this.selectedAnswers.push(model);
        }
      });
      if (this.selectedAnswers.length === 0) {
        alert('Lütfen en az bir cevap seçin.');
      } else {
        this.questionService.AddedUserAnswer(this.userId,this.selectedAnswers)
        location.reload()
      }
      
      console.log(this.selectedAnswers)
    }
    else  {
      alert('Lütfen  butun sorulari cevaplayiniz.');
    }
  }

  CheckAnswer(id:any){
    return this.selectedAnswers && this.selectedAnswers.length > 0
            && this.selectedAnswers.some(ans => ans.answerId === id)
            
  }

  onAnswerSelected(questionId: number, answer: any) {
    const selectedAnswerIndex = this.selectedAnswers.findIndex(answer => answer.answerId === answer.id);
    console.log(selectedAnswerIndex,answer)
    var model :UserAnswer = {
      answerDate : new Date(),
      answerId : answer.id,
      id : 0,
      questionId : questionId,
      userId : this.userId,
    }
    if (selectedAnswerIndex === -1) {
      this.selectedAnswers.push(model);
    } else {
      this.selectedAnswers.splice(selectedAnswerIndex, 1);
      console.log(this.selectedAnswers)
      this.selectedAnswers.push(model);
    }  }

}
