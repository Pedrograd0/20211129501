import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginRequest, UserLoginResponse } from 'src/Models/UserLoginRequest';
import { LoginService } from 'src/Services/LoginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  error : string=""
  constructor(private loginService: LoginService, private router: Router) { }

  loginUser(): void {
    const model : UserLoginRequest = {
        "email" : this.username.toString(),
        "password" : this.password.toString()
    }
    this.loginService.Login(model).subscribe(
      (token: UserLoginResponse) => {
        console.log(token)
        localStorage.setItem('token', token.apiToken);
        localStorage.setItem('user', JSON.stringify(token.user));
        this.router.navigate(['']);
        location.reload()
        
      },
      (error: any) => {
        this.error = 'Invalid username or password';
      }
    );
  }
}
