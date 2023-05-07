import { Component } from '@angular/core';
import { Question } from 'src/Models/Question';
import { QuestionService } from 'src/Services/QuestionService';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  questions: Question[] = [];
  isactive =true
 
  constructor(private questionService: QuestionService) { }//

  ngOnInit() {
    this.getList()
  }

  getList(){
    this.questionService.list().subscribe(questions => {
      this.questions = questions;
    });
  }
  editQuestion(question: Question) {
    console.log(question);
    var modl :Question = {
      answers : question.answers,
      createdDate : question.createdDate,
      id : question.id,
      questionActive : question.questionActive,
      userId : question.userId,
      questionUser : question.questionUser
    }
    this.questionService.update(modl.id,modl);
  }
  editAnswer(answer: any) {
    console.log(answer);
    this.questionService.updateAnswer(answer.id,answer);
  }
  DeleteQuestion(ID: any) {
    this.questionService.delete(ID);
    location.reload();
  }

  changeActive(question: Question){
    console.log(question);
    var modl :Question = {
      answers : question.answers,
      createdDate : question.createdDate,
      id : question.id,
      questionActive : !question.questionActive,
      userId : question.userId,
      questionUser : question.questionUser
    }
    this.questionService.update(modl.id,modl);
    this.isactive = !this.isactive
  }
}
