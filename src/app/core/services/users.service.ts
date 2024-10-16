import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../components/shared/models/User';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private USER_URL = 'http://127.0.0.1:8000/usuarios/newUser';

  constructor(private httpClient: HttpClient) {}

  newUser(user: User):Observable<any>{
    console.log('Llego al servicio ');
    console.log(user);
    return this.httpClient.post<any>(this.USER_URL, user).pipe(

      tap((response)=>{
        if(response){
          console.log("newUser=> " +response);
        }
      })
    )

  }

}
