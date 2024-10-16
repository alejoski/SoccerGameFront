import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import NewUserRegisterComponent from '../business/new-user-register/new-user-register.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, NewUserRegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  email: string = '';
  password: string = '';

  formNewUser = new FormControl('')

  constructor(private authSerices: AuthService,
              private router: Router) {}

  login(): void {
    console.log('Llego a login()', this.email, ' - ', this.password);
    this.authSerices.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/main/home']),
      error: (err) => console.log('Login Failed', err),
    });
  }
}
