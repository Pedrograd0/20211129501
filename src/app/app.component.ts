import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  role = -1;
  constructor(private router: Router) {

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    if(user != null){

      this.role = user.role
    }
  
  }
  
  title = 'onlineExam';
  
  Logout(){
    localStorage.clear();
    setTimeout( () => 1000 );
    
    location.reload()
  }
}

