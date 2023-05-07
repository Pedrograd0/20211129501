import { Injectable } from "@angular/core";
import { BaseService } from "./BaseService";
import { UserLoginRequest } from "src/Models/UserLoginRequest";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
  
    private readonly path = 'api/User/';
  
    constructor(private readonly baseService: BaseService) { }
  
    Login(data: UserLoginRequest): Observable<any> {
        console.log(data)
      return this.baseService.post<any>(this.path+"Login",data);
    }
  
  }