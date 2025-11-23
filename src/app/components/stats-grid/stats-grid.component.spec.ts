import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsGrid } from './stats-grid.component';
import { Statistics } from '../../models/scenario.model';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';
import { PercentageFormatPipe } from '../../pipes/percentage-format.pipe';

describe('StatsGrid', () => {
  let component: StatsGrid;
  let fixture: ComponentFixture<StatsGrid>;

  const mockStatistics: Statistics = {
    totalCandles: 100,
    priceStart: 100,
    priceEnd: 105,
    priceChangePercent: 5,
    oiStart: 1000,
    oiEnd: 1050,
    oiChangePercent: 5,
    volatilityPercent: 2.5,
    avgVolume: 50000,
    minVolume: 40000,
    maxVolume: 60000
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsGrid, NumberFormatPipe, PercentageFormatPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsGrid);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('statistics', mockStatistics);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('statistics input', () => {
    it('should accept statistics input', () => {
      expect(component.statistics()).toEqual(mockStatistics);
    });

    it('should be required input', () => {
      expect(component.statistics).toBeDefined();
    });
  });

  describe('oiPriceRatio computed signal', () => {
    it('should calculate correct ratio', () => {
      expect(component.oiPriceRatio()).toBe(1); // |5 / 5| = 1
    });

    it('should handle different ratios', () => {
      const stats = { ...mockStatistics, oiChangePercent: 10, priceChangePercent: 5 };
      fixture.componentRef.setInput('statistics', stats);
      fixture.detectChanges();

      expect(component.oiPriceRatio()).toBe(2); // |10 / 5| = 2
    });

    it('should return 0 when priceEnd is 0', () => {
      const stats = { ...mockStatistics, priceEnd: 0 };
      fixture.componentRef.setInput('statistics', stats);
      fixture.detectChanges();

      expect(component.oiPriceRatio()).toBe(0);
    });

    it('should handle negative percentages', () => {
      const stats = { ...mockStatistics, oiChangePercent: -10, priceChangePercent: 5 };
      fixture.componentRef.setInput('statistics', stats);
      fixture.detectChanges();

      expect(component.oiPriceRatio()).toBe(2); // |-10 / 5| = 2
    });
  });

  describe('getStatColor', () => {
    it('should return correct color for positive price change', () => {
      const color = component.getStatColor('price');
      expect(color).toBe('text-primary');
    });

    it('should return correct color for negative price change', () => {
      const stats = { ...mockStatistics, priceChangePercent: -5 };
      fixture.componentRef.setInput('statistics', stats);
      fixture.detectChanges();

      const color = component.getStatColor('price');
      expect(color).toBe('text-danger');
    });

    it('should return correct color for positive OI change', () => {
      const color = component.getStatColor('oi');
      expect(color).toBe('text-primary');
    });

    it('should return correct color for negative OI change', () => {
      const stats = { ...mockStatistics, oiChangePercent: -5 };
      fixture.componentRef.setInput('statistics', stats);
      fixture.detectChanges();

      const color = component.getStatColor('oi');
      expect(color).toBe('text-danger');
    });

    it('should return correct color for high ratio (>= 2.0)', () => {
      const stats = { ...mockStatistics, oiChangePercent: 10, priceChangePercent: 5 };
      fixture.componentRef.setInput('statistics', stats);
      fixture.detectChanges();

      const color = component.getStatColor('ratio');
      expect(color).toBe('text-primary');
    });

    it('should return correct color for low ratio (< 2.0)', () => {
      const color = component.getStatColor('ratio');
      expect(color).toBe('text-danger'); // ratio is 1
    });

    it('should return correct color for low volatility (< 2.5%)', () => {
      const stats = { ...mockStatistics, volatilityPercent: 2.0 };
      fixture.componentRef.setInput('statistics', stats);
      fixture.detectChanges();

      const color = component.getStatColor('volatility');
      expect(color).toBe('text-primary');
    });

    it('should return correct color for high volatility (>= 2.5%)', () => {
      const stats = { ...mockStatistics, volatilityPercent: 3.0 };
      fixture.componentRef.setInput('statistics', stats);
      fixture.detectChanges();

      const color = component.getStatColor('volatility');
      expect(color).toBe('text-danger');
    });

    it('should return default color for unknown type', () => {
      const color = component.getStatColor('unknown' as any);
      expect(color).toBe('text-gray-400');
    });
  });

  describe('template rendering', () => {
    it('should display total candles', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('100');
    });

    it('should display price change with correct formatting', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('5'); // price change percent
    });

    it('should display OI/Price ratio', () => {
      const compiled = fixture.nativeElement;
      const ratio = component.oiPriceRatio();
      expect(compiled.textContent).toContain(ratio.toFixed(2));
    });
  });
});
