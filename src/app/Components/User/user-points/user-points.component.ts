import { Component, SimpleChanges } from '@angular/core';
import { User } from 'src/Models/User';
import { UserPoint } from 'src/Models/UserPoint';
import { QuestionService } from 'src/Services/QuestionService';

@Component({
  selector: 'app-user-points',
  templateUrl: './user-points.component.html',
  styleUrls: ['./user-points.component.scss']
})
export class UserPointsComponent {

  role = 0
  userId = -1

  userPoints : UserPoint[]= []
  constructor(private questionService: QuestionService) {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.role = user.role
    this.userId = user.id
    this.getPointsUser(user.role,user.id)
  }


  getPointsUser(IsAdmin:number,userId:number){
    this.questionService.UserPoint().subscribe(questions => {
      if(IsAdmin == 1) this.userPoints = questions;
      else {
        var data = questions.filter((u) => u.userId === userId);
        console.log(questions)
        console.log(data)
        if(data) this.userPoints = data
      }
    });
  }
}
