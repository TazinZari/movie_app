import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies via GET', () => {
    const dummyMovies: any[] = [
      {
        id: 1,
        movie: 'Inception',
        rating: 8.8,
        image: 'https://image-url.com/inception.jpg',
        imdb_url: 'https://www.imdb.com/title/tt1375666/',
      },
      {
        id: 2,
        movie: 'Interstellar',
        rating: 8.6,
        image: 'https://image-url.com/interstellar.jpg',
        imdb_url: 'https://www.imdb.com/title/tt0816692/',
      },
    ];

    service.getMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne(service.apiURL);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovies);
  });
});
