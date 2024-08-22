import { FilterPipePipe } from './filter-pipe.pipe';

describe('FilterPipePipe', () => {
  let pipe: FilterPipePipe;

  beforeEach(() => {
    pipe = new FilterPipePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty array if search text is empty', () => {
    const movies = [
      { title: 'Inception' },
      { title: 'Interstellar' },
      { title: 'The Dark Knight' },
    ];
    const result = pipe.transform(movies, '');
    expect(result.length).toBe(0);
  });

  it('should filter movies based on search text', () => {
    const movies = [
      { title: 'Inception' },
      { title: 'Interstellar' },
      { title: 'The Dark Knight' },
    ];
    const result = pipe.transform(movies, 'inception');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Inception');
  });

  it('should return an empty array if no movies match the search text', () => {
    const movies = [
      { title: 'Inception' },
      { title: 'Interstellar' },
      { title: 'The Dark Knight' },
    ];
    const result = pipe.transform(movies, 'Avatar');
    expect(result.length).toBe(0);
  });

  it('should be case insensitive', () => {
    const movies = [
      { title: 'Inception' },
      { title: 'Interstellar' },
      { title: 'The Dark Knight' },
    ];
    const result = pipe.transform(movies, 'INCEPTION');
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Inception');
  });
});
