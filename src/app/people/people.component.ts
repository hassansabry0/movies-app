import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../services/trending.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {
  persons: any[] = [];
  isLoading: boolean = true;
  constructor(public _TrendingService: TrendingService) {}

  ngOnInit(): void {
    this._TrendingService.getTrending('person').subscribe({
      next: (response) => {
        this.persons = response.results.filter(
          (element: any) => element.profile_path
        );

        console.log(this.persons);
        this.isLoading = false;
      },
      error: (error) => {
        this.persons = error.message;
      },
    });
  }
}
