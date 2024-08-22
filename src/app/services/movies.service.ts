import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';

interface Movie {
  id: number;
  movie: string;
  rating: number;
  image: string;
  imdb_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  moviesListSubject = new Subject();

  constructor(private http: HttpClient) {}

  apiURL: string = 'https://dummyapi.online/api/movies';

  getMovies() {
    return this.http
      .get<Movie[]>(this.apiURL)
      .pipe(map((response: Movie[]) => response));
  }
}
