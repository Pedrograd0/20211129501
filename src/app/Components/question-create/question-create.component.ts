import { Component } from '@angular/core';
import { Question } from 'src/Models/Question';
import { Answer } from 'src/Models/Answer';
import { MatOption } from '@angular/material/core';

import { QuestionService } from 'src/Services/QuestionService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss'],

})
//burada token ve user kaldi
export class QuestionCreateComponent {
  Questions: string = '';
  options = [true,false]
  Answers: any[] = [{ans :'',IsTrue:false},
      {ans :'',IsTrue:false}, {ans :'',IsTrue:false}
      , {ans :'',IsTrue:false}, {ans :'',IsTrue:false}];

  constructor(private questionService: QuestionService
    ,private router: Router) {}

  kaydet() {
    const answerList : Answer [] = []
    this.Answers.forEach((x)=>{
      console.log(x)
      if(x.ans != ''){
        const ansx : Answer = {
          id: 0,
          questonAnswer: x.ans,
          questionId: 0,
          trueAnswer: x.IsTrue
         }
         answerList.push(ansx);
      }
      
    })
    var falseCheck = answerList.some(item => item.trueAnswer === true);
    if(falseCheck == false){
      alert("bu soru da hepsi false durumda lutfen dogru secenegi true yapiniz");
    }
    else
    {
      const models : Question = {
        answers : answerList,
        createdDate : new Date(),
        id : 0,
        questionActive : true,
        questionUser : this.Questions,
        userId : 1
      } 
      this.questionService.create(models).subscribe();
      this.router.navigate(['/questions']);
    }
    

  }
  
}
