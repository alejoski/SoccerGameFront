import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { User } from '../../shared/models/User';
import { UsersService } from '../../../core/services/users.service';


@Component({
  selector: 'app-new-user-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-user-register.component.html',
  styleUrl: './new-user-register.component.css',
})
export default class NewUserRegisterComponent {

  formNewUser = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    teamName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
  });

  newUser = new User();

  encryptedPassword: any = '';

  constructor(private userService: UsersService){}

  /***
   * Crea el nuevo usuario
   */
  enviarNuevoUsuario() {
    //Valida que el formulario este OK
    if (this.formNewUser.valid) {
      this.encryptedPassword = this.formNewUser.get('password2')?.value;
      this.encryptedPassword = this.hashPassword(this.encryptedPassword);

      this.newUser = {
        id : "0",
        email: this.formNewUser.get('email')?.value,
        user_name: this.formNewUser.get('email')?.value,
        team_name: this.formNewUser.get('teamName')?.value,
        password: this.encryptedPassword,

      };

      this.userService.newUser(this.newUser).subscribe({
        next: () => console.log("Finalizo bien"),
        error: (err) =>{
          console.log("Fallo algo ")
          console.log(err);

        }

      })
    }


  }

  hashPassword(password: string): string {

    const hash1 = CryptoJS.MD5(password).toString();
    const hash2 = CryptoJS.MD5(hash1).toString();
    return hash2;
  }

  /*
   * Valida si el control ya ha sido tocado y si tiene errores
   */
  hasErrros(controlName: string) {
    return (
      !this.formNewUser.get(controlName)?.valid &&
      this.formNewUser.get(controlName)?.touched
    );
  }

  passWordDiferente() {
    return (
      this.formNewUser.get('password')?.value ==
        this.formNewUser.get('password2')?.value ||
      !this.formNewUser.get('password2')?.touched
    );
  }
}
