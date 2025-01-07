import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../components/shared/models/User';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private USER_URL = 'http://127.0.0.1:8000/usuarios/new';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  newUser(user: User): Observable<any> {
    console.log('Llego al servicio ');
    console.log(user);
    user.create_date = new Date().toISOString();
    console.log(user);

    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<any>(this.USER_URL, user, { headers }).pipe(
      tap((response) => {
        if (response) {
          console.log('newUser=> ' + response);
        }
      })
    );
  }
}
