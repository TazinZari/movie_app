import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MoviesService } from '../services/movies.service';
import { of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let moviesServiceSpy: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MoviesService', [
      'getMovies',
      'moviesListSubject',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: MoviesService, useValue: spy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    moviesServiceSpy = TestBed.inject(
      MoviesService,
    ) as jasmine.SpyObj<MoviesService>;

    // Providing complete mock data that aligns with the Movie type
    moviesServiceSpy.getMovies.and.returnValue(
      of([
        {
          id: 1,
          title: 'Test Movie',
          movie: 'Test Movie Description',
          rating: 5,
          image: 'https://example.com/test-movie.jpg',
          imdb_url: 'https://imdb.com/test-movie',
        },
        {
          id: 2,
          title: 'Another Movie',
          movie: 'Another Movie Description',
          rating: 4,
          image: 'https://example.com/another-movie.jpg',
          imdb_url: 'https://imdb.com/another-movie',
        },
      ] as any[]),
    );
    moviesServiceSpy.moviesListSubject = new Subject();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    component.ngOnInit();
    expect(component.moviesList.length).toBeGreaterThan(0);
    expect(component.filertredList.length).toBeGreaterThan(0);
    expect(moviesServiceSpy.getMovies).toHaveBeenCalled();
  });

  it('should filter the movie list based on input', () => {
    component.moviesList = [
      {
        id: 1,
        title: 'Test Movie',
        movie: 'Test Movie Description',
        rating: 5,
        image: 'https://example.com/test-movie.jpg',
        imdb_url: 'https://imdb.com/test-movie',
      },
      {
        id: 2,
        title: 'Another Movie',
        movie: 'Another Movie Description',
        rating: 4,
        image: 'https://example.com/another-movie.jpg',
        imdb_url: 'https://imdb.com/another-movie',
      },
    ];

    component.changeMovieList('test');
    expect(component.filertredList.length).toBe(1);
    expect(component.filertredList[0].title).toBe('Test Movie');
  });

  it('should log an error if movies service fails', () => {
    const consoleSpy = spyOn(console, 'log');
    moviesServiceSpy.getMovies.and.returnValue(
      throwError(() => new Error('Failed to load movies')),
    );
    component.ngOnInit();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to load movies');
  });
});
