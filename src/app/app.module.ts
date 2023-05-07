import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { QuestionComponent } from './Components/question/question.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // buraya dikkat
import { HttpClientModule } from '@angular/common/http';
import { QuestionCreateComponent } from './Components/question-create/question-create.component';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { LoginComponent } from './Components/User/login/login.component';
import { UserQuestionAnswerComponent } from './Components/user-question-answer/user-question-answer.component';
import { UserPointsComponent } from './Components/User/user-points/user-points.component';
import { MatListModule } from '@angular/material/list';
import { UserCreateComponent } from './Components/User/user-create/user-create.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionCreateComponent,
    LoginComponent,
    UserQuestionAnswerComponent,
    UserPointsComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatListModule,
    ReactiveFormsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
