import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserData } from '../interfaces/user-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  isLoading: boolean = false;
  userData: UserData | null = null;

  constructor(private _AuthService: AuthService, private _Router: Router) {}
  ngOnInit(): void {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  submitLoginForm(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            // data sent
            this.isLoading = false;
            this._Router.navigate(['/home']);
            localStorage.setItem('token', response.token);
            this._AuthService.getUserData();
          } else {
            // data not sent
            this.isLoading = false;
            this.errorMessage = 'Incorrect email or password';
            console.log('Error');
          }
        },
        error: (error) => {
          this.errorMessage = error;
          console.log(error);
        },
      });
    }
  }
}
