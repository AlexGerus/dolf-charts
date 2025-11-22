import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Candle } from '../../models/scenario.model';

@Component({
  selector: 'app-chart-section',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart-section.component.html',
  styleUrls: ['./chart-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSectionComponent implements OnChanges, AfterViewInit {
  @Input() candles: Candle[] = [];

  @ViewChild('priceChart') priceChart?: BaseChartDirective;
  @ViewChild('oiChart') oiChart?: BaseChartDirective;
  @ViewChild('volumeChart') volumeChart?: BaseChartDirective;

  // Measurement tool state
  measurementMode = false;
  measurementStart: { index: number; value: number; time: string; x?: number; y?: number } | null = null;
  measurementEnd: { index: number; value: number; time: string; x?: number; y?: number } | null = null;
  currentMeasurementChart: 'price' | 'oi' | 'volume' | null = null;

  // Price Candlestick Chart
  public priceChartData: ChartConfiguration['data'] = {
    datasets: [{
      type: 'candlestick',
      label: 'Price',
      data: [],
    }]
  };

  public priceChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#00ff88',
        bodyColor: '#e0e0e0',
        borderColor: '#00ff88',
        borderWidth: 2,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items) => {
            if (items.length > 0) {
              const dataIndex = items[0].dataIndex;
              return this.candles[dataIndex]?.timeFormatted || '';
            }
            return '';
          },
          label: (context) => {
            const dataIndex = context.dataIndex;
            const candle = this.candles[dataIndex];
            if (candle) {
              const change = ((candle.price.close - candle.price.open) / candle.price.open * 100);
              return [
                `Open:  $${candle.price.open.toFixed(2)}`,
                `High:  $${candle.price.high.toFixed(2)}`,
                `Low:   $${candle.price.low.toFixed(2)}`,
                `Close: $${candle.price.close.toFixed(2)}`,
                `Change: ${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
              ];
            }
            return '';
          }
        }
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
            modifierKey: null as any
          },
          drag: {
            enabled: false
          },
          pinch: {
            enabled: true
          },
          mode: 'x'
        },
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: null as any
        },
        limits: {
          x: { min: 'original', max: 'original' }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm',
            hour: 'HH:mm'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawOnChartArea: true,
        },
        ticks: {
          color: '#888',
          maxRotation: 0,
          autoSkip: true,
          autoSkipPadding: 10,
        }
      },
      y: {
        position: 'right',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawOnChartArea: true,
        },
        ticks: {
          color: '#888',
          callback: (value) => `$${Number(value).toFixed(2)}`
        }
      }
    }
  };

  public priceChartType: any = 'candlestick';

  // Open Interest Candlestick Chart
  public oiChartData: ChartConfiguration['data'] = {
    datasets: [{
      type: 'candlestick',
      label: 'Open Interest',
      data: [],
    }]
  };

  public oiChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffa500',
        bodyColor: '#e0e0e0',
        borderColor: '#ffa500',
        borderWidth: 2,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items) => {
            if (items.length > 0) {
              const dataIndex = items[0].dataIndex;
              return this.candles[dataIndex]?.timeFormatted || '';
            }
            return '';
          },
          label: (context) => {
            const dataIndex = context.dataIndex;
            const candle = this.candles[dataIndex];
            if (candle) {
              const change = ((candle.openInterest.close - candle.openInterest.open) / candle.openInterest.open * 100);
              return [
                `Open:  ${this.formatNumber(candle.openInterest.open)}`,
                `High:  ${this.formatNumber(candle.openInterest.high)}`,
                `Low:   ${this.formatNumber(candle.openInterest.low)}`,
                `Close: ${this.formatNumber(candle.openInterest.close)}`,
                `Change: ${change >= 0 ? '+' : ''}${change.toFixed(2)}%`
              ];
            }
            return '';
          }
        }
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: false
          },
          drag: {
            enabled: true,
            modifierKey: 'ctrl' as any,
            backgroundColor: 'rgba(255, 165, 0, 0.1)',
          },
          pinch: {
            enabled: true
          },
          mode: 'x'
        },
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'shift' as any
        },
        limits: {
          x: { min: 'original', max: 'original' }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm',
            hour: 'HH:mm'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawOnChartArea: true,
        },
        ticks: {
          color: '#888',
          maxRotation: 0,
          autoSkip: true,
          autoSkipPadding: 10,
        }
      },
      y: {
        position: 'right',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawOnChartArea: true,
        },
        ticks: {
          color: '#888',
          callback: (value) => this.formatNumber(Number(value))
        }
      }
    }
  };

  public oiChartType: any = 'candlestick';

  // Volume Bar Chart
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
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#00ff88',
        bodyColor: '#e0e0e0',
        borderColor: '#00ff88',
        borderWidth: 2,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items) => {
            if (items.length > 0) {
              return items[0].label || '';
            }
            return '';
          },
          label: (context) => {
            const value = context.parsed.y ?? 0;
            return `Volume: ${this.formatNumber(value)}`;
          }
        }
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.1,
            modifierKey: null as any
          },
          drag: {
            enabled: false
          },
          pinch: {
            enabled: true
          },
          mode: 'x'
        },
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: null as any
        },
        limits: {
          x: { min: 'original', max: 'original' }
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
          displayFormats: {
            minute: 'HH:mm',
            hour: 'HH:mm'
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawOnChartArea: true,
        },
        ticks: {
          color: '#888',
          maxRotation: 0,
          autoSkip: true,
          autoSkipPadding: 10,
        }
      },
      y: {
        position: 'right',
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawOnChartArea: true,
        },
        ticks: {
          color: '#888',
          callback: (value) => this.formatNumber(Number(value))
        }
      }
    }
  };

  public volumeChartType: any = 'bar';

  ngAfterViewInit(): void {
    // Charts are initialized
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['candles'] && this.candles) {
      this.updateCharts();
    }
  }

  private updateCharts(): void {
    // Prepare candlestick data for Price
    const priceData = this.candles.map((candle) => ({
      x: candle.timestamp,
      o: candle.price.open,
      h: candle.price.high,
      l: candle.price.low,
      c: candle.price.close,
    }));

    // Prepare candlestick data for OI
    const oiData = this.candles.map((candle) => ({
      x: candle.timestamp,
      o: candle.openInterest.open,
      h: candle.openInterest.high,
      l: candle.openInterest.low,
      c: candle.openInterest.close,
    }));

    // Prepare volume data with timestamps
    const volumeData = this.candles.map((candle, index) => ({
      x: candle.timestamp,
      y: candle.volume
    }));

    // Determine volume colors based on price movement
    const volumeColors = this.candles.map((candle, index) => {
      if (index === 0) return '#00ff88';
      const prevPrice = this.candles[index - 1].price.close;
      return candle.price.close >= prevPrice ? '#00ff88' : '#ff4444';
    });

    // Update Price Candlestick Chart
    this.priceChartData = {
      datasets: [{
        type: 'candlestick',
        label: 'Price',
        data: priceData as any,
        borderColors: {
          up: '#00ff88',
          down: '#ff4444',
          unchanged: '#999999'
        },
        backgroundColors: {
          up: 'rgba(0, 255, 136, 0.5)',
          down: 'rgba(255, 68, 68, 0.5)',
          unchanged: 'rgba(153, 153, 153, 0.5)'
        },
      } as any]
    };

    // Update OI Candlestick Chart
    this.oiChartData = {
      datasets: [{
        type: 'candlestick',
        label: 'Open Interest',
        data: oiData as any,
        borderColors: {
          up: '#ffa500',
          down: '#ff4444',
          unchanged: '#999999'
        },
        backgroundColors: {
          up: 'rgba(255, 165, 0, 0.5)',
          down: 'rgba(255, 68, 68, 0.5)',
          unchanged: 'rgba(153, 153, 153, 0.5)'
        },
      } as any]
    };

    // Update Volume Chart
    this.volumeChartData = {
      datasets: [{
        data: volumeData,
        label: 'Volume',
        backgroundColor: volumeColors,
        borderColor: 'transparent',
        borderWidth: 0,
      }]
    };
  }

  resetZoom(): void {
    if (this.priceChart?.chart) {
      (this.priceChart.chart as any).resetZoom();
    }
    if (this.oiChart?.chart) {
      (this.oiChart.chart as any).resetZoom();
    }
    if (this.volumeChart?.chart) {
      (this.volumeChart.chart as any).resetZoom();
    }
  }

  zoomIn(): void {
    if (this.priceChart?.chart) {
      (this.priceChart.chart as any).zoom(1.1);
    }
    if (this.oiChart?.chart) {
      (this.oiChart.chart as any).zoom(1.1);
    }
    if (this.volumeChart?.chart) {
      (this.volumeChart.chart as any).zoom(1.1);
    }
  }

  zoomOut(): void {
    if (this.priceChart?.chart) {
      (this.priceChart.chart as any).zoom(0.9);
    }
    if (this.oiChart?.chart) {
      (this.oiChart.chart as any).zoom(0.9);
    }
    if (this.volumeChart?.chart) {
      (this.volumeChart.chart as any).zoom(0.9);
    }
  }

  toggleMeasurement(): void {
    this.measurementMode = !this.measurementMode;
    if (!this.measurementMode) {
      this.measurementStart = null;
      this.measurementEnd = null;
    }
  }

  getMeasurementData(): { percentChange: number; timeChange: string; points: number } | null {
    if (!this.measurementStart || !this.measurementEnd) return null;

    const percentChange = ((this.measurementEnd.value - this.measurementStart.value) / this.measurementStart.value) * 100;
    const points = Math.abs(this.measurementEnd.index - this.measurementStart.index);
    const timeChange = `${this.measurementStart.time} → ${this.measurementEnd.time}`;

    return { percentChange, timeChange, points };
  }

  onChartClick(event: any, chartType: 'price' | 'oi' | 'volume'): void {
    if (!this.measurementMode) return;

    const chart = chartType === 'price' ? this.priceChart?.chart :
                  chartType === 'oi' ? this.oiChart?.chart :
                  this.volumeChart?.chart;

    if (!chart) return;

    const canvasPosition = (event as MouseEvent);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = canvasPosition.clientX - rect.left;
    const y = canvasPosition.clientY - rect.top;

    const dataX = (chart as any).scales.x.getValueForPixel(x);
    const dataY = (chart as any).scales.y.getValueForPixel(y);

    // Find nearest candle by timestamp
    let nearestIndex = 0;
    let minDiff = Math.abs(this.candles[0].timestamp - dataX);

    for (let i = 1; i < this.candles.length; i++) {
      const diff = Math.abs(this.candles[i].timestamp - dataX);
      if (diff < minDiff) {
        minDiff = diff;
        nearestIndex = i;
      }
    }

    if (nearestIndex >= 0 && nearestIndex < this.candles.length) {
      const candle = this.candles[nearestIndex];
      const value = chartType === 'price' ? candle.price.close :
                    chartType === 'oi' ? candle.openInterest.close :
                    candle.volume;

      if (!this.measurementStart) {
        this.measurementStart = {
          index: nearestIndex,
          value: value,
          time: candle.timeFormatted,
          x: x,
          y: y
        };
        this.currentMeasurementChart = chartType;
      } else if (this.currentMeasurementChart === chartType) {
        this.measurementEnd = {
          index: nearestIndex,
          value: value,
          time: candle.timeFormatted,
          x: x,
          y: y
        };
      }
    }
  }

  clearMeasurement(): void {
    this.measurementStart = null;
    this.measurementEnd = null;
    this.currentMeasurementChart = null;
  }

  getMeasurementLine(): { x1: number; y1: number; x2: number; y2: number; length: number; angle: number } | null {
    if (!this.measurementStart?.x || !this.measurementStart?.y || !this.measurementEnd?.x || !this.measurementEnd?.y) {
      return null;
    }

    const x1 = this.measurementStart.x;
    const y1 = this.measurementStart.y;
    const x2 = this.measurementEnd.x;
    const y2 = this.measurementEnd.y;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    return { x1, y1, x2, y2, length, angle };
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
