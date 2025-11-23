import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ScenarioService } from './scenario.service';
import { ScenarioData, Candle } from '../models/scenario.model';

describe('ScenarioService', () => {
  let service: ScenarioService;

  const mockCandle: Candle = {
    timestamp: 1234567890,
    timeFormatted: '10:31',
    price: { open: 100, high: 110, low: 90, close: 105 },
    openInterest: { open: 1000, high: 1100, low: 900, close: 1050 },
    volume: 50000,
    turnover: 10000
  };

  const mockScenarioData: ScenarioData = {
    scenario: 'Test Scenario',
    description: 'Test Description',
    symbol: 'BTC/USDT',
    candles: [mockCandle],
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScenarioService]
    });
    service = TestBed.inject(ScenarioService);
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(service).toBeDefined();
    });

    it('should initialize with empty scenarios signal', () => {
      expect(service.scenarios()).toEqual([]);
    });
  });

  describe('addScenario', () => {
    it('should add a scenario to the list', () => {
      service.addScenario(mockScenarioData);

      expect(service.scenarios().length).toBe(1);
      expect(service.scenarios()[0]).toEqual(mockScenarioData);
    });

    it('should add multiple scenarios', () => {
      const scenario2 = { ...mockScenarioData, scenario: 'Scenario 2' };

      service.addScenario(mockScenarioData);
      service.addScenario(scenario2);

      expect(service.scenarios().length).toBe(2);
      expect(service.scenarios()[0].scenario).toBe('Test Scenario');
      expect(service.scenarios()[1].scenario).toBe('Scenario 2');
    });

    it('should throw error when trying to add more than 6 scenarios', () => {
      for (let i = 0; i < 6; i++) {
        service.addScenario({ ...mockScenarioData, scenario: `Scenario ${i}` });
      }

      expect(() => {
        service.addScenario(mockScenarioData);
      }).toThrow('Maximum of 6 scenarios allowed');
    });
  });

  describe('removeScenario', () => {
    beforeEach(() => {
      service.addScenario({ ...mockScenarioData, scenario: 'Scenario 1' });
      service.addScenario({ ...mockScenarioData, scenario: 'Scenario 2' });
      service.addScenario({ ...mockScenarioData, scenario: 'Scenario 3' });
    });

    it('should remove scenario at specified index', () => {
      service.removeScenario(1);

      expect(service.scenarios().length).toBe(2);
      expect(service.scenarios()[0].scenario).toBe('Scenario 1');
      expect(service.scenarios()[1].scenario).toBe('Scenario 3');
    });

    it('should handle removing first scenario', () => {
      service.removeScenario(0);

      expect(service.scenarios().length).toBe(2);
      expect(service.scenarios()[0].scenario).toBe('Scenario 2');
    });

    it('should handle removing last scenario', () => {
      service.removeScenario(2);

      expect(service.scenarios().length).toBe(2);
      expect(service.scenarios()[1].scenario).toBe('Scenario 2');
    });
  });

  describe('clearAllScenarios', () => {
    it('should clear all scenarios', () => {
      service.addScenario(mockScenarioData);
      service.addScenario(mockScenarioData);

      expect(service.scenarios().length).toBe(2);

      service.clearAllScenarios();

      expect(service.scenarios().length).toBe(0);
    });

    it('should work when scenarios list is already empty', () => {
      service.clearAllScenarios();

      expect(service.scenarios().length).toBe(0);
    });
  });

  describe('getScenariosCount', () => {
    it('should return 0 when no scenarios', () => {
      expect(service.getScenariosCount()).toBe(0);
    });

    it('should return correct count after adding scenarios', () => {
      service.addScenario(mockScenarioData);
      expect(service.getScenariosCount()).toBe(1);

      service.addScenario(mockScenarioData);
      expect(service.getScenariosCount()).toBe(2);
    });

    it('should return correct count after removing scenarios', () => {
      service.addScenario(mockScenarioData);
      service.addScenario(mockScenarioData);
      service.removeScenario(0);

      expect(service.getScenariosCount()).toBe(1);
    });
  });

  describe('validateScenario', () => {
    it('should return true for valid scenario', () => {
      const valid = service.validateScenario(mockScenarioData);
      expect(valid).toBe(true);
    });

    it('should return false for null data', () => {
      expect(service.validateScenario(null)).toBe(false);
    });

    it('should return false for non-object data', () => {
      expect(service.validateScenario('string')).toBe(false);
      expect(service.validateScenario(123)).toBe(false);
    });

    it('should return false when missing required fields', () => {
      const invalidData = { ...mockScenarioData };
      delete (invalidData as any).scenario;

      expect(service.validateScenario(invalidData)).toBe(false);
    });

    it('should return false when candles is not an array', () => {
      const invalidData = { ...mockScenarioData, candles: 'not an array' };

      expect(service.validateScenario(invalidData)).toBe(false);
    });

    it('should return false when candles array is empty', () => {
      const invalidData = { ...mockScenarioData, candles: [] };

      expect(service.validateScenario(invalidData)).toBe(false);
    });

    it('should return false when candle structure is invalid', () => {
      const invalidData = {
        ...mockScenarioData,
        candles: [{ invalid: 'candle' }]
      };

      expect(service.validateScenario(invalidData)).toBe(false);
    });

    it('should return false when statistics are invalid', () => {
      const invalidData = {
        ...mockScenarioData,
        statistics: { invalid: 'stats' }
      };

      expect(service.validateScenario(invalidData)).toBe(false);
    });
  });

  describe('parseScenarioFile', () => {
    it('should parse valid JSON file', async () => {
      const fileContent = JSON.stringify(mockScenarioData);
      const file = new File([fileContent], 'test.json', { type: 'application/json' });

      const result = await service.parseScenarioFile(file);

      expect(result).toEqual(mockScenarioData);
    });

    it('should reject invalid JSON', async () => {
      const file = new File(['invalid json'], 'test.json', { type: 'application/json' });

      await expect(service.parseScenarioFile(file)).rejects.toThrow();
    });

    it('should reject invalid scenario structure', async () => {
      const invalidData = { invalid: 'data' };
      const file = new File([JSON.stringify(invalidData)], 'test.json', { type: 'application/json' });

      await expect(service.parseScenarioFile(file)).rejects.toThrow('Invalid scenario data format');
    });
  });

  describe('optimizeCandles', () => {
    it('should return original array when length <= 500', () => {
      const candles = Array(500).fill(mockCandle);
      const optimized = service.optimizeCandles(candles);

      expect(optimized.length).toBe(500);
      expect(optimized).toEqual(candles);
    });

    it('should optimize array when length > 500', () => {
      const candles = Array(1000).fill(mockCandle).map((c, i) => ({
        ...c,
        timestamp: c.timestamp + i
      }));

      const optimized = service.optimizeCandles(candles);

      expect(optimized.length).toBe(200); // 1000 / 5 = 200
      expect(optimized[0]).toEqual(candles[0]);
      expect(optimized[1]).toEqual(candles[5]);
    });
  });
});
