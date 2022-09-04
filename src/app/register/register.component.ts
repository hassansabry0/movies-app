import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {}

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.required,
    ]),
    last_name: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.required,
    ]),
    age: new FormControl(null, [
      Validators.min(16),
      Validators.max(80),
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
      ),
    ]),
  });

  submitRegisterForm(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (response) => {
          console.log(response);

          if (response.message === 'success') {
            // data sent
            console.log(response);
            this.isLoading = false;
            this._Router.navigate(['/login']);
          } else {
            // data not sent
            this.isLoading = false;
            this.errorMessage = response.errors.email.message;
            console.log(response);
          }
        },
        error: (error) => {
          this.errorMessage = error;
        },
      });
    }
  }
}
