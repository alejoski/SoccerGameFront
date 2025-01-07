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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  newUser = new User();

  encryptedPassword: any = '';

  constructor(private userService: UsersService) {}

  passwordOk: boolean = true;
  validationFormOk: boolean = false;
  userCreated = false;
  createdError = false;
  otherError = false;

  /***
   * Crea el nuevo usuario
   */
  enviarNuevoUsuario() {
    //Valida que el formulario este OK

    if (this.formNewUser.valid) {
      this.encryptedPassword = this.formNewUser.get('confirm_password')?.value;
      this.encryptedPassword = this.hashPassword(this.encryptedPassword);

      this.newUser = {
        id: '0',
        email: this.formNewUser.get('email')?.value,
        user_name: this.formNewUser.get('email')?.value,
        team_name: this.formNewUser.get('teamName')?.value,
        password: this.encryptedPassword,
      };

      this.userService.newUser(this.newUser).subscribe({
        next: () => {
          console.log('Finalizo bien');
          this.userCreated = true;
          this.formNewUser.reset();
        },
        error: (err) => {
          console.log(err.error.detail);
          console.log(err.status);
          if (err.error.detail.toString().includes('user_already_registered')) {
            this.createdError = true;
          }else{
            this.otherError = true
          }
        },
      });
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
  hasErrros(controlName: string, errorType: string) {
    return (
      this.formNewUser.get(controlName)?.hasError(errorType) &&
      this.formNewUser.get(controlName)?.touched
    );
  }

  passWordEquals() {
    return (
      this.formNewUser.get('password')?.value ==
        this.formNewUser.get('confirm_password')?.value ||
      !this.formNewUser.get('confirm_password')?.touched
    );
  }

  validateForm(): boolean {
    console.log('Llego a validar el formulario');

    return true;
  }
}
