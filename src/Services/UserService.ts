import { Injectable } from "@angular/core";
import { BaseService } from "./BaseService";
import { UserLoginRequest } from "src/Models/UserLoginRequest";
import { Observable } from "rxjs";
import { User } from "src/Models/User";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    private readonly path = 'api/User/';
  
    constructor(private readonly baseService: BaseService) { }
  
    CreateUser(data: User): Observable<any> {
        console.log(data)
      return this.baseService.post<any>(this.path+"Create",data);
    }
  
  }