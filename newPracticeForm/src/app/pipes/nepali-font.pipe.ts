import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'nepaliFont'
})
export class NepaliFontPipe implements PipeTransform {
  transform(value: number): string {
    const nepaliNumerals = ['१', '२', '३', '४', '५', '६', '७', '८', '९', '०'];
    const englishNumerals = value.toString().split('');
    console.log('englishNumerals.map(num => nepaliNumerals[parseInt(num) - 1]).join(\'\'): ', englishNumerals.map(num => nepaliNumerals[parseInt(num) - 1]).join(''))
    return englishNumerals.map(num => nepaliNumerals[parseInt(num) - 1]).join('');
  }
}
