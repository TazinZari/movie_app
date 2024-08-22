import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { of, Subject, throwError } from 'rxjs';
import { MovieComponent } from './movie.component';
import { MoviesService } from '../services/movies.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: ActivatedRoute;
  let destroy$: Subject<void>;

  const movieMockData = [
    {
      id: 1,
      movie: 'Movie One',
      rating: 8,
      image: 'image1.jpg',
      imdb_url: 'http://imdb.com/1',
    },
    {
      id: 2,
      movie: 'Movie Two',
      rating: 7,
      image: 'image2.jpg',
      imdb_url: 'http://imdb.com/2',
    },
  ];

  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj('MoviesService', ['getMovies']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('1'),
        },
      },
    } as any;

    await TestBed.configureTestingModule({
      imports: [MovieComponent],
      providers: [
        { provide: MoviesService, useValue: mockMoviesService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    destroy$ = new Subject<void>();
    component['destroy'] = destroy$;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies and set movieDetails based on route id', () => {
    mockMoviesService.getMovies.and.returnValue(of(movieMockData));

    component.ngOnInit();

    expect(component.movies).toEqual(movieMockData);
    expect(component.movieDetails).toEqual(movieMockData[0]);
  });

  it('should log error if movies fetching fails', () => {
    const consoleSpy = spyOn(console, 'log');
    const errorMessage = 'Error occurred!';
    mockMoviesService.getMovies.and.returnValue(
      throwError(() => new Error(errorMessage)),
    );

    component.ngOnInit();

    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
  });

  it('should clean up on destroy', () => {
    spyOn(destroy$, 'next');
    spyOn(destroy$, 'complete');

    component.ngOnDestroy();

    expect(destroy$.next).toHaveBeenCalled();
    expect(destroy$.complete).toHaveBeenCalled();
  });
});
