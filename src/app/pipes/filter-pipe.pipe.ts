import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true,
})
export class FilterPipePipe implements PipeTransform {
  transform(movies: any[], searchText: string): any[] {
    searchText = searchText.toLocaleLowerCase();
    let searchResult: any[] = [];

    if (searchText) {
      searchResult = movies.filter((movie: any) => {
        return movie.title.toLocaleLowerCase().includes(searchText);
      });
    }

    return searchResult;
  }
}
