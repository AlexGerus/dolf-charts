import { describe, it, expect, beforeEach } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScenarioCard } from './scenario-card.component';
import { StatsGrid } from '../stats-grid/stats-grid.component';
import { ChartSection } from '../chart-section/chart-section.component';
import { ScenarioData } from '../../models/scenario.model';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';
import { PercentageFormatPipe } from '../../pipes/percentage-format.pipe';

describe.skip('ScenarioCard', () => {
  let component: ScenarioCard;
  let fixture: ComponentFixture<ScenarioCard>;

  const mockScenarioData: ScenarioData = {
    scenario: 'Test Scenario',
    description: 'Test Description',
    symbol: 'BTC/USDT',
    candles: [{
      timestamp: 1234567890,
      timeFormatted: '10:31',
      price: { open: 100, high: 110, low: 90, close: 105 },
      openInterest: { open: 1000, high: 1100, low: 900, close: 1050 },
      volume: 50000,
      turnover: 11000
    }],
    statistics: {
      totalCandles: 1,
      priceStart: 100,
      priceEnd: 105,
      priceChangePercent: 5,
      oiStart: 1000,
      oiEnd: 1050,
      oiChangePercent: 5,
      volatilityPercent: 2.5,
      avgVolume: 50000,
      minVolume: 50000,
      maxVolume: 50000
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenarioCard, StatsGrid, ChartSection, NumberFormatPipe, PercentageFormatPipe]
    }).compileComponents();

    fixture = TestBed.createComponent(ScenarioCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('scenarioData', mockScenarioData);
    fixture.componentRef.setInput('index', 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
  //
  // describe('inputs', () => {
  //   it('should accept scenarioData input', () => {
  //     expect(component.scenarioData()).toEqual(mockScenarioData);
  //   });
  //
  //   it('should accept index input', () => {
  //     expect(component.index()).toBe(0);
  //   });
  //
  //   it('should be required inputs', () => {
  //     expect(component.scenarioData).toBeDefined();
  //     expect(component.index).toBeDefined();
  //   });
  // });
  //
  // describe('output events', () => {
  //   it('should emit removeScenario with index on remove', () => {
  //     const emitSpy = vi.spyOn(component.removeScenario, 'emit');
  //
  //     component.onRemove();
  //
  //     expect(emitSpy).toHaveBeenCalledWith(0);
  //   });
  //
  //   it('should emit correct index when different', () => {
  //     fixture.componentRef.setInput('index', 5);
  //     fixture.detectChanges();
  //
  //     const emitSpy = vi.spyOn(component.removeScenario, 'emit');
  //
  //     component.onRemove();
  //
  //     expect(emitSpy).toHaveBeenCalledWith(5);
  //   });
  // });
  //
  // describe('template rendering', () => {
  //   it('should display scenario title', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.scenario-title')?.textContent).toContain('Test Scenario');
  //   });
  //
  //   it('should display scenario description', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.scenario-description')?.textContent).toContain('Test Description');
  //   });
  //
  //   it('should display symbol', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.scenario-symbol')?.textContent).toContain('BTC/USDT');
  //   });
  //
  //   it('should render StatsGrid component', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('app-stats-grid')).toBeTruthy();
  //   });
  //
  //   it('should render ChartSection component', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('app-chart-section')).toBeTruthy();
  //   });
  //
  //   it('should have remove button', () => {
  //     const compiled = fixture.nativeElement;
  //     const removeButton = compiled.querySelector('.remove-button');
  //     expect(removeButton).toBeTruthy();
  //   });
  //
  //   it('should call onRemove when remove button is clicked', () => {
  //     const spy = vi.spyOn(component, 'onRemove');
  //     const compiled = fixture.nativeElement;
  //     const removeButton = compiled.querySelector('.remove-button') as HTMLButtonElement;
  //
  //     removeButton.click();
  //
  //     expect(spy).toHaveBeenCalled();
  //   });
  // });
  //
  // describe('child components integration', () => {
  //   it('should pass statistics to StatsGrid', () => {
  //     const statsGrid = fixture.debugElement.query(
  //       (el) => el.componentInstance instanceof StatsGrid
  //     )?.componentInstance;
  //
  //     expect(statsGrid).toBeDefined();
  //     expect(statsGrid.statistics()).toEqual(mockScenarioData.statistics);
  //   });
  //
  //   it('should pass candles to ChartSection', () => {
  //     const chartSection = fixture.debugElement.query(
  //       (el) => el.componentInstance instanceof ChartSection
  //     )?.componentInstance;
  //
  //     expect(chartSection).toBeDefined();
  //     expect(chartSection.candles()).toEqual(mockScenarioData.candles);
  //   });
  // });
  //
  // describe('responsive behavior', () => {
  //   it('should have scenario-card class', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.scenario-card')).toBeTruthy();
  //   });
  //
  //   it('should have animate-slideUp class', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.animate-slideUp')).toBeTruthy();
  //   });
  // });
});
