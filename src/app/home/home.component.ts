import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../services/trending.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: any = [];
  tv: any = [];
  people: any = [];
  isLoading: boolean = true;
  // for header
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    nav: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 8,
      },
    },
  };

  constructor(
    public _TrendingService: TrendingService,
    public _AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this._TrendingService.getTrending('movie').subscribe({
      next: (response) => {
        this.movies = response.results.slice(0, 10);
        this.isLoading = false;
      },
      error: (error) => {
        this.movies = error.message;
      },
    });
    this._TrendingService.getTrending('tv').subscribe({
      next: (response) => {
        this.tv = response.results.slice(0, 10);
        this.isLoading = false;
      },
      error: (error) => {
        this.tv = error.message;
      },
    });

    this._TrendingService.getTrending('person').subscribe({
      next: (response) => {
        this.people = response.results
          .filter((element: any) => element.profile_path)
          .slice(0, 10);
        this.isLoading = false;
      },
      error: (error) => {
        this.people = error.message;
      },
    });
  }
}
