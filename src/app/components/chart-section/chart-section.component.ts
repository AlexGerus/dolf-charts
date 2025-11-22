import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Candle } from '../../models/scenario.model';

@Component({
  selector: 'app-chart-section',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart-section.component.html',
  styleUrls: ['./chart-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSectionComponent implements OnChanges {
  @Input() candles: Candle[] = [];

  // Price Chart
  public priceChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Price',
      borderColor: '#00ff88',
      backgroundColor: 'rgba(0, 255, 136, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    }]
  };

  public priceChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00ff88',
        bodyColor: '#e0e0e0',
        borderColor: '#00ff88',
        borderWidth: 1,
        callbacks: {
          label: (context) => `Price: $${context.parsed.y?.toFixed(2) ?? '0'}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#888' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: {
          color: '#888',
          callback: (value) => `$${value}`
        }
      }
    }
  };

  public priceChartType: ChartType = 'line';

  // OI Chart
  public oiChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Open Interest',
      borderColor: '#ffa500',
      backgroundColor: 'rgba(255, 165, 0, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    }]
  };

  public oiChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffa500',
        bodyColor: '#e0e0e0',
        borderColor: '#ffa500',
        borderWidth: 1,
        callbacks: {
          label: (context) => `OI: ${this.formatNumber(context.parsed.y ?? 0)}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#888' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: {
          color: '#888',
          callback: (value) => this.formatNumber(Number(value))
        }
      }
    }
  };

  public oiChartType: ChartType = 'line';

  // Volume Chart
  public volumeChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Volume',
      backgroundColor: [],
      borderColor: 'transparent',
    }]
  };

  public volumeChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#00ff88',
        bodyColor: '#e0e0e0',
        borderColor: '#00ff88',
        borderWidth: 1,
        callbacks: {
          label: (context) => `Volume: ${this.formatNumber(context.parsed.y ?? 0)}`
        }
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#888' }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: {
          color: '#888',
          callback: (value) => this.formatNumber(Number(value))
        }
      }
    }
  };

  public volumeChartType: ChartType = 'bar';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candles'] && this.candles) {
      this.updateCharts();
    }
  }

  private updateCharts(): void {
    const labels = this.candles.map(c => c.timeFormatted);
    const prices = this.candles.map(c => c.price.close);
    const ois = this.candles.map(c => c.openInterest.close);
    const volumes = this.candles.map(c => c.volume);

    // Determine volume colors based on price movement
    const volumeColors = this.candles.map((candle, index) => {
      if (index === 0) return '#00ff88';
      const prevPrice = this.candles[index - 1].price.close;
      return candle.price.close >= prevPrice ? '#00ff88' : '#ff4444';
    });

    // Update Price Chart
    this.priceChartData = {
      labels,
      datasets: [{
        ...this.priceChartData.datasets[0],
        data: prices
      }]
    };

    // Update OI Chart
    this.oiChartData = {
      labels,
      datasets: [{
        ...this.oiChartData.datasets[0],
        data: ois
      }]
    };

    // Update Volume Chart
    this.volumeChartData = {
      labels,
      datasets: [{
        ...this.volumeChartData.datasets[0],
        data: volumes,
        backgroundColor: volumeColors
      }]
    };
  }

  private formatNumber(value: number): string {
    const absValue = Math.abs(value);
    if (absValue >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + 'B';
    } else if (absValue >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + 'M';
    } else if (absValue >= 1_000) {
      return (value / 1_000).toFixed(2) + 'K';
    } else {
      return value.toFixed(2);
    }
  }
}
