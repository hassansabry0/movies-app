import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../services/trending.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css'],
})
export class TvComponent implements OnInit {
  tvs: any = [];
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
    this._TrendingService.pagination('tv', 1).subscribe({
      next: (response) => {
        console.log(response);
        this.tvs = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        this.tvs = error.message;
      },
    });
  }

  paginate(pageNumber: number) {
    this._TrendingService.pagination('tv', pageNumber).subscribe({
      next: (response) => {
        this.tvs = response.results;
        console.log(this.currentPage);
        this.currentPage = pageNumber;
        this.isLoading = false;
      },
      error: (error) => {
        this.tvs = error.message;
      },
    });
  }
  // To Do Next Page
  next() {
    this._TrendingService.pagination('tv', this.currentPage + 1).subscribe({
      next: (response) => {
        this.tvs = response.results;
        this.currentPage = this.currentPage + 1;
        console.log(this.currentPage);
        this.isLoading = false;
      },
      error: (error) => {
        this.tvs = error.message;
      },
    });
  }
  // To Do Previous Page
  previous() {
    this._TrendingService.pagination('tv', this.currentPage - 1).subscribe({
      next: (response) => {
        this.tvs = response.results;
        this.currentPage = this.currentPage - 1;
        console.log(this.currentPage);
        this.isLoading = false;
      },
      error: (error) => {
        this.tvs = error.message;
      },
    });
  }
}
