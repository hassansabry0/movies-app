import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrendingService {
  imgPrefix: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private _HttpClient: HttpClient) {}

  getTrending(trend: string): Observable<any> {
    // trend is movie | tv | person
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/trending/${trend}/week?api_key=4aad0ed6186b78dac8796280bde2fded`
    );
  }
  getDetails(media: string, id: string): Observable<any> {
    // media is movie | tv
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=4aad0ed6186b78dac8796280bde2fded&language=en-US`
    );
  }

  pagination(media: string, pageNumber: number): Observable<any> {
    // media is movie | tv
    return this._HttpClient.get(
      `https://api.themoviedb.org/3/discover/${media}?api_key=4aad0ed6186b78dac8796280bde2fded&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`
    );
  }
}
