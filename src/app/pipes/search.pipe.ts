import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(arraySearch: any[], searchTerm: string): any[] {
    return arraySearch.filter((element) =>
      element.title
        ? element.title.toLowerCase().includes(searchTerm.toLowerCase())
        : element.original_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
