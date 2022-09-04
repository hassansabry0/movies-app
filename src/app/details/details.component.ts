import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrendingService } from '../services/trending.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id: string = '';
  mediaType: string = '';
  movieDetails: any;
  tvDetails: any;
  personDetails: any;
  isLoading: boolean = true;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    public _TrendingService: TrendingService
  ) {}

  ngOnInit(): void {
    this.id = this._ActivatedRoute.snapshot.params['id'];
    this.mediaType = this._ActivatedRoute.snapshot.params['mediaType'];
    switch (this.mediaType) {
      case 'movie':
        this._TrendingService.getDetails('movie', this.id).subscribe({
          next: (response) => {
            console.log(response);
            this.movieDetails = response;
            this.isLoading = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
        break;
      case 'tv':
        this._TrendingService.getDetails('tv', this.id).subscribe({
          next: (response) => {
            console.log(response);
            this.tvDetails = response;
            this.isLoading = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
        break;
      case 'person':
        this._TrendingService.getDetails('person', this.id).subscribe({
          next: (response) => {
            console.log(response);
            this.personDetails = response;
            this.isLoading = false;
          },
          error: (error) => {
            console.log(error);
          },
        });
        break;
    }
  }
}
