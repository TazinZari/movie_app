import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FilterPipePipe } from '../pipes/filter-pipe.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FilterPipePipe, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  moviesList: any[] = [];
  filertredList: any[] = [];
  private destroy = new Subject<void>();
  value: string = '';

  constructor(
    private moviesService: MoviesService,
    private route: Router,
  ) {}

  ngOnInit() {
    this.moviesService
      .getMovies()
      .pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any[]) => {
          if (data) {
            this.moviesList = data;
            this.filertredList = data;
            this.moviesService.moviesListSubject.next({ data: data });
          }
        },
        (error: Error) => {
          console.log(error.message);
        },
      );
  }

  changeMovieList(event: string) {
    this.filertredList = this.moviesList.filter((el: any) =>
      el.movie.toLocaleLowerCase().includes(event.toLocaleLowerCase()),
    );
  }

  openImdbLink(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
