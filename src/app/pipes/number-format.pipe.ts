import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number, decimals: number = 2): string {
    if (value === null || value === undefined) {
      return '0';
    }

    const absValue = Math.abs(value);

    if (absValue >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(decimals) + 'B';
    } else if (absValue >= 1_000_000) {
      return (value / 1_000_000).toFixed(decimals) + 'M';
    } else if (absValue >= 1_000) {
      return (value / 1_000).toFixed(decimals) + 'K';
    } else {
      return value.toFixed(decimals);
    }
  }
}
