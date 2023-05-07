import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './BaseService';
import { Question } from 'src/Models/Question';
import { HttpHeaders } from '@angular/common/http';
import { Answer } from 'src/Models/Answer';
import { UserAnswer } from 'src/Models/UserAnswer';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly path = 'api/question/';


  constructor(private readonly baseService: BaseService) { }

  create(data: Question): Observable<any> {
    return this.baseService.post<any>(this.path+"Create", data);
  }

  list(): Observable<any[]> {
    return this.baseService.get<any[]>(this.path+"questions");
  }

  update(id: number, data: Question): any {
    this.baseService.post<any>(this.path+"update", data).subscribe(
      result => {
        return result
      },
      error => {
        // işlem başarısız ise yapılacaklar
        console.log('Servis çağrısı başarısız: ', error);
      }
    );
  }

  delete(id: number): any {
    this.baseService.post<any>(this.path+'delete',id).subscribe(
    result => {
      return result;

    },
    error => {
      // işlem başarısız ise yapılacaklar
      console.log('Servis çağrısı başarısız: ', error);
    }
  );
  }

  updateAnswer(id: number, data: Answer): any {
    this.baseService.post<any>('api/answer/'+"update", data).subscribe(
      result => {
        return result;
      },
      error => {
        // işlem başarısız ise yapılacaklar
        console.log('Servis çağrısı başarısız: ', error);
      }
    );
  }

  AddedUserAnswer(UserId:number, data: UserAnswer[]): any {
    this.baseService.post<any>('api/answer/'+"AnswerSave/"+UserId, data).subscribe(
      result => {
        return result;
      },
      error => {
        // işlem başarısız ise yapılacaklar
        console.log('Servis çağrısı başarısız: ', error);
      }
    );
  }

  UserPoint(): Observable<any[]> {
    return this.baseService.get<any[]>('api/answer/'+"UserAnswerPoint");
  }

}