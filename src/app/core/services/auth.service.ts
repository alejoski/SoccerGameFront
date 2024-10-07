import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Util } from '../../components/shared/util/util.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private LOGIN_URL = 'http://127.0.0.1:8000/usuarios/login';

  private tokenKey = 'authTokenSG';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(correo: string, password: string): Observable<any> {
    console.log('en el servicio ', correo, ' / ', password);
    return this.httpClient.post<any>(this.LOGIN_URL, { correo, password }).pipe(
      tap((response) => {
        if (response.token) {
          console.log(response.token);
          this.setToken(response.token);
        }
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch (err) {
      console.log('localStorage no existe.');
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
    const date_unix = this.getUnixDate()
    const date_unix2 = new Util().getUnixDate();

    return date_unix < exp;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public  getUnixDate(): Number {
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
