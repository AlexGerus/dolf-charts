import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartSection } from './chart-section.component';
import { Candle } from '../../models/scenario.model';

// Mock AG Charts
vi.mock('ag-charts-angular', () => ({
  AgFinancialCharts: {
    selector: 'ag-financial-charts',
    template: '<div class="mock-ag-chart"></div>',
    standalone: true
  }
}));

vi.mock('ag-charts-enterprise', () => ({}));

describe('ChartSection', () => {
  let component: ChartSection;
  let fixture: ComponentFixture<ChartSection>;

  const mockCandles: Candle[] = [
    {
      timestamp: 1234567890,
      timeFormatted: '10:31',
      price: { open: 100, high: 110, low: 90, close: 105 },
      openInterest: { open: 1000, high: 1100, low: 900, close: 1050 },
      volume: 50000,
      turnover: 10000
    },
    {
      timestamp: 1234567950,
      timeFormatted: '10:32',
      price: { open: 105, high: 115, low: 95, close: 110 },
      openInterest: { open: 1050, high: 1150, low: 950, close: 1100 },
      volume: 55000,
      turnover: 11000
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartSection]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartSection);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('candles', mockCandles);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('candles input', () => {
    it('should accept candles input', () => {
      expect(component.candles()).toEqual(mockCandles);
    });

    it('should be required input', () => {
      expect(component.candles).toBeDefined();
    });
  });

  describe('chart options initialization', () => {
    it('should initialize priceChartOptions with correct settings', () => {
      expect(component.priceChartOptions).toBeDefined();
      expect(component.priceChartOptions.chartType).toBe('candlestick');
      expect(component.priceChartOptions.toolbar).toBe(true);
      expect(component.priceChartOptions.zoom).toBe(true);
      expect(component.priceChartOptions.volume).toBe(false);
    });

    it('should initialize oiChartOptions with correct settings', () => {
      expect(component.oiChartOptions).toBeDefined();
      expect(component.oiChartOptions.chartType).toBe('candlestick');
      expect(component.oiChartOptions.toolbar).toBe(true);
      expect(component.oiChartOptions.zoom).toBe(true);
      expect(component.oiChartOptions.volume).toBe(false);
    });
  });

  describe('updateCharts effect', () => {
    it('should transform price data correctly', () => {
      const priceData = component.priceChartOptions.data;

      expect(priceData).toBeDefined();
      expect(Array.isArray(priceData)).toBe(true);
      expect(priceData?.length).toBe(2);

      if (Array.isArray(priceData) && priceData.length > 0) {
        const firstData = priceData[0] as any;
        expect(firstData.open).toBe(100);
        expect(firstData.high).toBe(110);
        expect(firstData.low).toBe(90);
        expect(firstData.close).toBe(105);
        expect(firstData.volume).toBe(50000);
        expect(firstData.date).toBeInstanceOf(Date);
      }
    });

    it('should transform OI data correctly', () => {
      const oiData = component.oiChartOptions.data;

      expect(oiData).toBeDefined();
      expect(Array.isArray(oiData)).toBe(true);
      expect(oiData?.length).toBe(2);

      if (Array.isArray(oiData) && oiData.length > 0) {
        const firstData = oiData[0] as any;
        expect(firstData.open).toBe(1000);
        expect(firstData.high).toBe(1100);
        expect(firstData.low).toBe(900);
        expect(firstData.close).toBe(1050);
        expect(firstData.date).toBeInstanceOf(Date);
      }
    });

    it('should update charts when candles input changes', () => {
      const newCandles: Candle[] = [
        {
          timestamp: 1234568000,
          timeFormatted: '10:33',
          price: { open: 110, high: 120, low: 100, close: 115 },
          openInterest: { open: 1100, high: 1200, low: 1000, close: 1150 },
          volume: 60000,
          turnover: 1000
        }
      ];

      fixture.componentRef.setInput('candles', newCandles);
      fixture.detectChanges();

      const priceData = component.priceChartOptions.data;
      expect(Array.isArray(priceData)).toBe(true);
      expect(priceData?.length).toBe(1);

      if (Array.isArray(priceData) && priceData.length > 0) {
        const firstData = priceData[0] as any;
        expect(firstData.close).toBe(115);
      }
    });
  });

  describe('template rendering', () => {
    it('should have correct structure', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.charts-container')).toBeTruthy();
    });

    it('should render two chart wrappers', () => {
      const compiled = fixture.nativeElement;
      const chartWrappers = compiled.querySelectorAll('.chart-wrapper');
      expect(chartWrappers.length).toBe(2);
    });

    it('should have chart titles', () => {
      const compiled = fixture.nativeElement;
      const titles = compiled.querySelectorAll('.chart-title');
      expect(titles.length).toBe(2);
      expect(titles[0].textContent).toContain('Price Chart');
      expect(titles[1].textContent).toContain('Open Interest');
    });
  });

  describe('responsive design', () => {
    it('should have chart-canvas containers', () => {
      const compiled = fixture.nativeElement;
      const canvases = compiled.querySelectorAll('.chart-canvas');
      expect(canvases.length).toBe(2);
    });
  });

  describe('data transformation edge cases', () => {
    it('should handle empty candles array', () => {
      fixture.componentRef.setInput('candles', []);
      fixture.detectChanges();

      expect(component.priceChartOptions.data).toBeDefined();
      expect(Array.isArray(component.priceChartOptions.data)).toBe(true);
      expect(component.priceChartOptions.data?.length).toBe(0);
    });

    it('should handle single candle', () => {
      const singleCandle = [mockCandles[0]];
      fixture.componentRef.setInput('candles', singleCandle);
      fixture.detectChanges();

      expect(component.priceChartOptions.data?.length).toBe(1);
      expect(component.oiChartOptions.data?.length).toBe(1);
    });

    it('should preserve timestamp order', () => {
      const priceData = component.priceChartOptions.data as any[];

      expect(priceData[0].date.getTime()).toBeLessThan(priceData[1].date.getTime());
    });
  });
});
