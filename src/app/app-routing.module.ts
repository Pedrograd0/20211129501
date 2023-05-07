import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionComponent } from './Components/question/question.component';
import { QuestionCreateComponent } from './Components/question-create/question-create.component';
import { AuthGuard } from './AuthGuard';
import { LoginComponent } from './Components/User/login/login.component';
import { UserQuestionAnswerComponent } from './Components/user-question-answer/user-question-answer.component';
  

const appRoutes: Routes = [
  { path: '', component: LoginComponent }, // ana sayfa
  { path: 'questions', component: QuestionComponent ,canActivate: [AuthGuard] },
  { path: 'create-question', component: QuestionCreateComponent,canActivate: [AuthGuard]  }, // create-question yolu
  { path: 'login', component: LoginComponent },
  { path: 'questionAnswer', component: UserQuestionAnswerComponent ,canActivate: [AuthGuard]},

  { path: '**',component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
