import { describe, it, expect } from 'vitest';
import { NumberFormatPipe } from './number-format.pipe';

describe('NumberFormatPipe', () => {
  let pipe: NumberFormatPipe;

  beforeEach(() => {
    pipe = new NumberFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should format billions correctly', () => {
      expect(pipe.transform(1000000000)).toBe('1.00B');
      expect(pipe.transform(1500000000)).toBe('1.50B');
      expect(pipe.transform(9999999999)).toBe('10.00B');
    });

    it('should format millions correctly', () => {
      expect(pipe.transform(1000000)).toBe('1.00M');
      expect(pipe.transform(1500000)).toBe('1.50M');
      expect(pipe.transform(999999999)).toBe('1000.00M');
    });

    it('should format thousands correctly', () => {
      expect(pipe.transform(1000)).toBe('1.00K');
      expect(pipe.transform(1500)).toBe('1.50K');
      expect(pipe.transform(999999)).toBe('1000.00K');
    });

    it('should format small numbers correctly', () => {
      expect(pipe.transform(999)).toBe('999.00');
      expect(pipe.transform(100)).toBe('100.00');
      expect(pipe.transform(10.5)).toBe('10.50');
    });

    it('should handle zero', () => {
      expect(pipe.transform(0)).toBe('0.00');
    });

    it('should handle negative numbers', () => {
      expect(pipe.transform(-1000000000)).toBe('-1.00B');
      expect(pipe.transform(-1000000)).toBe('-1.00M');
      expect(pipe.transform(-1000)).toBe('-1.00K');
      expect(pipe.transform(-100)).toBe('-100.00');
    });

    it('should handle decimal precision', () => {
      expect(pipe.transform(1234567)).toBe('1.23M');
      expect(pipe.transform(1999)).toBe('2.00K');
      expect(pipe.transform(1.999)).toBe('2.00');
    });
  });
});
