import { ChangeDetectionStrategy, Component, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgFinancialCharts } from 'ag-charts-angular';
import type { AgFinancialChartOptions } from 'ag-charts-enterprise';
import 'ag-charts-enterprise';
import { Candle } from '../../models/scenario.model';

@Component({
  selector: 'app-chart-section',
  standalone: true,
  imports: [CommonModule, AgFinancialCharts],
  templateUrl: './chart-section.component.html',
  styleUrls: ['./chart-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSection {
  readonly candles = input.required<Candle[]>();

  // Chart options for Price Chart
  public priceChartOptions: AgFinancialChartOptions = {
    data: [],
    chartType: 'candlestick',
    toolbar: true,
    zoom: true,
    volume: false,
    navigator: false,
    rangeButtons: true,
    statusBar: true,
    dateKey: 'date',
    openKey: 'open',
    highKey: 'high',
    lowKey: 'low',
    closeKey: 'close',
    width: undefined,
    height: undefined,
    theme: {
      baseTheme: 'ag-default-dark',
      palette: {
        up: { fill: '#00ff88', stroke: '#00ff88' },
        down: { fill: '#ff4444', stroke: '#ff4444' },
      },
      overrides: {
        common: {
          background: {
            fill: 'rgba(30, 30, 46, 0.8)'
          }
        }
      }
    }
  };

  // Chart options for Open Interest Chart
  public oiChartOptions: AgFinancialChartOptions = {
    data: [],
    chartType: 'candlestick',
    toolbar: true,
    zoom: true,
    volume: false,
    navigator: false,
    rangeButtons: true,
    statusBar: true,
    dateKey: 'date',
    openKey: 'open',
    highKey: 'high',
    lowKey: 'low',
    closeKey: 'close',
    width: undefined,
    height: undefined,
    theme: {
      baseTheme: 'ag-default-dark',
      palette: {
        up: { fill: '#ffa500', stroke: '#ffa500' },
        down: { fill: '#ff4444', stroke: '#ff4444' },
      },
      overrides: {
        common: {
          background: {
            fill: 'rgba(30, 30, 46, 0.8)'
          }
        }
      }
    }
  };

  constructor() {
    // Use effect() instead of ngOnChanges
    effect(() => {
      this.updateCharts();
    });
  }

  private updateCharts(): void {
    // Prepare data for Price Chart
    const priceData = this.candles().map((candle) => ({
      date: new Date(candle.timestamp),
      open: candle.price.open,
      high: candle.price.high,
      low: candle.price.low,
      close: candle.price.close,
      volume: candle.volume
    }));

    // Prepare data for Open Interest Chart
    const oiData = this.candles().map((candle) => ({
      date: new Date(candle.timestamp),
      open: candle.openInterest.open,
      high: candle.openInterest.high,
      low: candle.openInterest.low,
      close: candle.openInterest.close,
    }));

    // Update chart options with new data
    this.priceChartOptions = {
      ...this.priceChartOptions,
      data: priceData,
    };

    this.oiChartOptions = {
      ...this.oiChartOptions,
      data: oiData,
    };
  }
}
