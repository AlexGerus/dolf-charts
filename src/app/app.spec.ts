import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { instance, mock, when } from 'ts-mockito';
import { App } from './app';
import { ScenarioService } from './services/scenario.service';
import { FileUploader } from './components/file-uploader/file-uploader.component';
import { ScenarioCard } from './components/scenario-card/scenario-card.component';
import { ScenarioData } from './models/scenario.model';
import { signal } from '@angular/core';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let mockScenarioService: ScenarioService;

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
    mockScenarioService = mock(ScenarioService);

    // Setup mock to return a signal
    const scenariosSignal = signal<ScenarioData[]>([]);
    when(mockScenarioService.scenarios).thenReturn(scenariosSignal);

    await TestBed.configureTestingModule({
      imports: [App, FileUploader, ScenarioCard],
      providers: [
        { provide: ScenarioService, useValue: instance(mockScenarioService) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  describe('service injection', () => {
    it('should inject ScenarioService', () => {
      expect(component.scenarioService).toBeDefined();
    });
  });

  describe('scenarios signal', () => {
    it('should reference scenarios from service', () => {
      expect(component.scenarios).toBeDefined();
      expect(component.scenarios()).toEqual([]);
    });
  });

  describe('scenariosCount computed signal', () => {
    it('should return 0 when no scenarios', () => {
      expect(component.scenariosCount()).toBe(0);
    });

    it('should calculate correct count', () => {
      // Update the mock signal
      const scenariosSignal = signal<ScenarioData[]>([mockScenarioData, mockScenarioData]);
      when(mockScenarioService.scenarios).thenReturn(scenariosSignal);

      // Recreate component with updated mock
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [App, FileUploader, ScenarioCard],
        providers: [
          { provide: ScenarioService, useValue: instance(mockScenarioService) }
        ]
      });

      const newFixture = TestBed.createComponent(App);
      const newComponent = newFixture.componentInstance;

      expect(newComponent.scenariosCount()).toBe(2);
    });
  });

  describe('onFilesUploaded', () => {
    it('should log uploaded scenarios', () => {
      const consoleSpy = vi.spyOn(console, 'log');

      component.onFilesUploaded([mockScenarioData]);

      expect(consoleSpy).toHaveBeenCalledWith('Uploaded 1 scenario(s)');
    });

    it('should handle multiple scenarios', () => {
      const consoleSpy = vi.spyOn(console, 'log');

      component.onFilesUploaded([mockScenarioData, mockScenarioData, mockScenarioData]);

      expect(consoleSpy).toHaveBeenCalledWith('Uploaded 3 scenario(s)');
    });
  });

  describe('onRemoveScenario', () => {
    it('should call service removeScenario with correct index', () => {
      const mockService = TestBed.inject(ScenarioService);
      const removeSpy = vi.spyOn(mockService, 'removeScenario');

      component.onRemoveScenario(2);

      expect(removeSpy).toHaveBeenCalledWith(2);
    });
  });

  describe('clearAllScenarios', () => {
    it('should call service clearAllScenarios', () => {
      const mockService = TestBed.inject(ScenarioService);
      const clearSpy = vi.spyOn(mockService, 'clearAllScenarios');

      component.clearAllScenarios();

      expect(clearSpy).toHaveBeenCalled();
    });
  });

  describe('template rendering', () => {
    it('should have app container', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.app-container')).toBeTruthy();
    });

    it('should have header', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.app-header')).toBeTruthy();
    });

    it('should display app title', () => {
      const compiled = fixture.nativeElement;
      const title = compiled.querySelector('.app-title');
      expect(title?.textContent).toContain('DOLF Strategy Analytics');
    });

    it('should render FileUploader component', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('app-file-uploader')).toBeTruthy();
    });

    it('should show empty state when no scenarios', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.empty-state')).toBeTruthy();
    });

    it('should not show header actions when no scenarios', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.header-actions')).toBeFalsy();
    });
  });

  // describe('with scenarios', () => {
  //   beforeEach(() => {
  //     // Create new component with scenarios
  //     const scenariosSignal = signal<ScenarioData[]>([mockScenarioData]);
  //     when(mockScenarioService.scenarios).thenReturn(scenariosSignal);
  //
  //     TestBed.resetTestingModule();
  //     TestBed.configureTestingModule({
  //       imports: [App, FileUploader, ScenarioCard],
  //       providers: [
  //         { provide: ScenarioService, useValue: instance(mockScenarioService) }
  //       ]
  //     });
  //
  //     fixture = TestBed.createComponent(App);
  //     component = fixture.componentInstance;
  //     fixture.detectChanges();
  //   });
  //
  //   it('should show header actions when scenarios exist', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.header-actions')).toBeTruthy();
  //   });
  //
  //   it('should display scenario counter', () => {
  //     const compiled = fixture.nativeElement;
  //     const counter = compiled.querySelector('.counter-value');
  //     expect(counter?.textContent).toContain('1/6');
  //   });
  //
  //   it('should show scenarios grid', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.scenarios-grid')).toBeTruthy();
  //   });
  //
  //   it('should not show empty state', () => {
  //     const compiled = fixture.nativeElement;
  //     expect(compiled.querySelector('.empty-state')).toBeFalsy();
  //   });
  //
  //   it('should have clear all button', () => {
  //     const compiled = fixture.nativeElement;
  //     const clearButton = compiled.querySelector('.clear-button');
  //     expect(clearButton).toBeTruthy();
  //     expect(clearButton?.textContent).toContain('Clear All');
  //   });
  //
  //   it('should call clearAllScenarios when clear button clicked', () => {
  //     const spy = vi.spyOn(component, 'clearAllScenarios');
  //     const compiled = fixture.nativeElement;
  //     const clearButton = compiled.querySelector('.clear-button') as HTMLButtonElement;
  //
  //     clearButton.click();
  //
  //     expect(spy).toHaveBeenCalled();
  //   });
  // });

  describe('footer', () => {
    it('should render footer', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.app-footer')).toBeTruthy();
    });

    it('should display copyright text', () => {
      const compiled = fixture.nativeElement;
      const footer = compiled.querySelector('.app-footer');
      expect(footer?.textContent).toContain('2025');
      expect(footer?.textContent).toContain('Crypto Prime Signals');
    });
  });

  describe('responsive layout', () => {
    it('should have main content area', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.app-main')).toBeTruthy();
    });

    it('should have proper structure', () => {
      const compiled = fixture.nativeElement;
      const container = compiled.querySelector('.app-container');
      const header = container?.querySelector('.app-header');
      const main = container?.querySelector('.app-main');
      const footer = container?.querySelector('.app-footer');

      expect(header).toBeTruthy();
      expect(main).toBeTruthy();
      expect(footer).toBeTruthy();
    });
  });
});
