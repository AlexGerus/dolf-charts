import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Statistics } from '../../models/scenario.model';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';
import { PercentageFormatPipe } from '../../pipes/percentage-format.pipe';

@Component({
  selector: 'app-stats-grid',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe, PercentageFormatPipe],
  templateUrl: './stats-grid.component.html',
  styleUrls: ['./stats-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsGridComponent {
  @Input() statistics!: Statistics;

  getOiPriceRatio(): number {
    if (!this.statistics || this.statistics.priceEnd === 0) {
      return 0;
    }
    return Math.abs(this.statistics.oiChangePercent / this.statistics.priceChangePercent);
  }

  getStatColor(type: 'price' | 'oi' | 'ratio' | 'volatility'): string {
    if (!this.statistics) {
      return 'text-gray-400';
    }

    switch (type) {
      case 'price':
        return this.statistics.priceChangePercent >= 0 ? 'text-primary' : 'text-danger';
      case 'oi':
        return this.statistics.oiChangePercent >= 0 ? 'text-primary' : 'text-danger';
      case 'ratio':
        return this.getOiPriceRatio() >= 2.0 ? 'text-primary' : 'text-danger';
      case 'volatility':
        return this.statistics.volatilityPercent < 2.5 ? 'text-primary' : 'text-danger';
      default:
        return 'text-gray-400';
    }
  }
}
