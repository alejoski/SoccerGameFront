import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export default class LoginComponent {
  email : string ='';
  password: string = '';

  constructor(private authSerices: AuthService, private router: Router){

  }

  login():void {
    console.log('Llego a login()', this.email," - " ,this.password );
    this.authSerices.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/main/home']),
      error: (err) => console.log('Login Failed', err)
    });
  }




}
