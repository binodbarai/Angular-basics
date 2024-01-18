import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'ageFormatterPipe'
})
export class AgeFormatterPipe implements PipeTransform {
  transform(value: number): string {
    return value + '-years';
  }
}
