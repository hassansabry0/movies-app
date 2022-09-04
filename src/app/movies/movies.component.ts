import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../services/trending.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: any = [];
  pages: number[] = [];
  pagesNumber: number = 20;
  currentPage: number = 1;
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(public _TrendingService: TrendingService) {}

  ngOnInit(): void {
    // To Do Pagination
    this.pages = new Array(this.pagesNumber).fill('');

    // To Do Get First Page When Start
    this._TrendingService.pagination('movie', 1).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.isLoading = false;
        console.log(this.movies);
      },
      error: (error) => {
        this.movies = error.message;
      },
    });
  }

  paginate(pageNumber: number) {
    this._TrendingService.pagination('movie', pageNumber).subscribe({
      next: (response) => {
        this.movies = response.results;
        console.log(this.currentPage);
        this.currentPage = pageNumber;
        this.isLoading = false;
      },
      error: (error) => {
        this.movies = error.message;
      },
    });
  }
  // To Do Next Page
  next() {
    this._TrendingService.pagination('movie', this.currentPage + 1).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.currentPage = this.currentPage + 1;
        console.log(this.currentPage);
        this.isLoading = false;
      },
      error: (error) => {
        this.movies = error.message;
      },
    });
  }
  // To Do Previous Page
  previous() {
    this._TrendingService.pagination('movie', this.currentPage - 1).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.currentPage = this.currentPage - 1;
        console.log(this.currentPage);
        this.isLoading = false;
      },
      error: (error) => {
        this.movies = error.message;
      },
    });
  }
}
