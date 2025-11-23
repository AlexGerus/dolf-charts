import { describe, it, expect, beforeEach } from 'vitest';
import { PercentageFormatPipe } from './percentage-format.pipe';

describe('PercentageFormatPipe', () => {
  let pipe: PercentageFormatPipe;

  beforeEach(() => {
    pipe = new PercentageFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should format positive percentages with default precision', () => {
      expect(pipe.transform(5.5)).toBe('+5.50%');
      expect(pipe.transform(10)).toBe('+10.00%');
      expect(pipe.transform(0.5)).toBe('+0.50%');
    });

    it('should format negative percentages with default precision', () => {
      expect(pipe.transform(-5.5)).toBe('-5.50%');
      expect(pipe.transform(-10)).toBe('-10.00%');
      expect(pipe.transform(-0.5)).toBe('-0.50%');
    });

    it('should handle zero', () => {
      expect(pipe.transform(0)).toBe('+0.00%');
    });

    it('should respect custom precision parameter', () => {
      expect(pipe.transform(5.12345, 2)).toBe('+5.12%');
      expect(pipe.transform(5.12345, 3)).toBe('+5.123%');
      expect(pipe.transform(5.12345, 0)).toBe('+5%');
    });

    it('should handle very small percentages', () => {
      expect(pipe.transform(0.001)).toBe('+0.00%');
      expect(pipe.transform(0.001, 3)).toBe('+0.001%');
    });

    it('should handle very large percentages', () => {
      expect(pipe.transform(1000)).toBe('+1000.00%');
      expect(pipe.transform(1000, 2)).toBe('+1000.00%');
    });

    it('should round correctly', () => {
      expect(pipe.transform(5.555, 2)).toBe('+5.55%');
      expect(pipe.transform(5.554, 2)).toBe('+5.55%');
      expect(pipe.transform(-5.555, 2)).toBe('-5.55%');
    });
  });
});
