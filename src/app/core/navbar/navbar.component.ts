import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;

  constructor(public _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    // for watching changes in user data
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() !== null) {
          //auth
          this.isLogin = true;
        } else {
          //not auth
          this.isLogin = false;
        }
      },
    });
  }

  // removeUser() {
  //   localStorage.clear();
  //   this.isLogin = false;
  //   this._Router.navigate(['/login']);
  // }
}
