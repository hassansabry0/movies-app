import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
AuthService;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData: any = {};

  constructor(public _AuthService: AuthService) {}

  ngOnInit(): void {
    this.userData = this._AuthService.userData.getValue();
    console.log(this.userData);
  }
}
