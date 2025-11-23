import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
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
export class StatsGrid {
  // Use input() instead of @Input()
  readonly statistics = input.required<Statistics>();

  // Use computed signal for OI/Price ratio
  readonly oiPriceRatio = computed(() => {
    const stats = this.statistics();
    if (!stats || stats.priceEnd === 0) {
      return 0;
    }
    return Math.abs(stats.oiChangePercent / stats.priceChangePercent);
  });

  getStatColor(type: 'price' | 'oi' | 'ratio' | 'volatility'): string {
    const stats = this.statistics();
    if (!stats) {
      return 'text-gray-400';
    }

    switch (type) {
      case 'price':
        return stats.priceChangePercent >= 0 ? 'text-primary' : 'text-danger';
      case 'oi':
        return stats.oiChangePercent >= 0 ? 'text-primary' : 'text-danger';
      case 'ratio':
        return this.oiPriceRatio() >= 2.0 ? 'text-primary' : 'text-danger';
      case 'volatility':
        return stats.volatilityPercent < 2.5 ? 'text-primary' : 'text-danger';
      default:
        return 'text-gray-400';
    }
  }
}
