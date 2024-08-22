import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MoviesService } from '../services/movies.service';

interface Movie {
  id: number;
  movie: string;
  rating: number;
  image: string;
  imdb_url: string;
}

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  movieDetails: Movie | undefined;
  movies: Movie[] = [];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private moviesService: MoviesService,
  ) {}

  ngOnInit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.moviesService
      .getMovies()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: Movie[]) => {
          if (data) {
            this.movies = data;
            this.movieDetails = this.movies.find((el: any) => el.id == id);
          }
        },
        (error: Error) => {
          console.log(error.message);
        },
      );
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
