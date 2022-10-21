import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if (value.length > 400) {
      return value.substr(0, 400) + '...';
    }
    return value
  }

}
