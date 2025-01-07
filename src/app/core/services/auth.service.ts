import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Util } from '../../components/shared/util/util.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_URL = 'http://127.0.0.1:8000/usuarios/login';

  //Nombre del la llave con la q se alamcena en el Local Storage
  private tokenKey = 'authTokenSG';
  private userKey = 'acc3rl0k3s';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    console.log('en el servicio ', email, ' / ', password);
    return this.httpClient.post<any>(this.LOGIN_URL, { email, password }).pipe(
      tap((response) => {
        console.log('RESPONSE');
        console.log(response);
        if (response.token) {
          console.log(response.token);
          this.setToken(response.token);
          this.setUser(response.user);
        }
      }),

      //catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {

    let errorMessage = error.statusText;

        console.log('*********************');
        console.log(errorMessage);
        console.log('*********************');


    if (error.error instanceof ErrorEvent) {
      console.log(error.error);
      // Error del lado del cliente o de red
      // errorMessage = `Error: ${error.error.message}`;
    } else {
      console.log(error.error);
      // Error del lado del servidor
      // errorMessage = `Error ${error.status}: ${error.message}`;
    }
    console.log("ERROR >")
    console.log(error);

    return throwError(() => new Error(errorMessage.toString()));
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }


  private setUser(user: string): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }


  public getToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch (err) {
      console.log('localStorage no existe');
    }
    return null;
  }

  public getUser():string|null{
    try {
      return localStorage.getItem(this.userKey);
    } catch (err) {
      console.log('localStorage no existe');
    }
    return null;
  }

  //Valida si el usuario esta autenticado o no

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    //Se decodifica del base 64
    const payload = JSON.parse(atob(token.split('.')[1]));

    //Obtiene la fecha del JWT
    const exp = payload.exp;
    //Obtiene la fecha actual en formato UNIX
    const date_unix = this.getUnixDate();
    const date_unix2 = new Util().getUnixDate();

    return date_unix < exp;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public getUnixDate(): Number {
    const activationDate = new Date();
    const date_unix = new Date(
      activationDate.getUTCFullYear(),
      activationDate.getUTCMonth(),
      activationDate.getUTCDate(),
      activationDate.getUTCHours(),
      activationDate.getUTCMinutes(),
      activationDate.getUTCSeconds()
    );

    var timeStr = date_unix.getTime();
    var time = timeStr.toString().substring(0, 10);

    return parseInt(time);
  }
}
