import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ScenarioData, Candle } from '../models/scenario.model';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {
  private scenariosSubject = new BehaviorSubject<ScenarioData[]>([]);
  public scenarios$: Observable<ScenarioData[]> = this.scenariosSubject.asObservable();

  constructor() {}

  /**
   * Parse scenario file from uploaded JSON
   */
  async parseScenarioFile(file: File): Promise<ScenarioData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);

          if (!this.validateScenario(data)) {
            reject(new Error('Invalid scenario data format'));
            return;
          }

          // Optimize candles if there are too many
          const optimizedData: ScenarioData = {
            ...data,
            candles: this.optimizeCandles(data.candles)
          };

          resolve(optimizedData);
        } catch (error) {
          reject(new Error(`Failed to parse file: ${error}`));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Validate scenario data structure
   */
  validateScenario(data: any): boolean {
    if (!data || typeof data !== 'object') {
      return false;
    }

    // Check required fields
    if (!data.scenario || !data.description || !data.symbol || !data.candles || !data.statistics) {
      return false;
    }

    // Check candles array
    if (!Array.isArray(data.candles) || data.candles.length === 0) {
      return false;
    }

    // Validate first candle structure
    const firstCandle = data.candles[0];
    if (!firstCandle.timestamp || !firstCandle.price || !firstCandle.openInterest || !firstCandle.volume) {
      return false;
    }

    // Validate statistics
    const stats = data.statistics;
    if (typeof stats.totalCandles !== 'number' || typeof stats.priceStart !== 'number' || typeof stats.priceEnd !== 'number') {
      return false;
    }

    return true;
  }

  /**
   * Optimize candles array - if more than 500 candles, take every 5th
   */
  optimizeCandles(candles: Candle[]): Candle[] {
    if (candles.length <= 500) {
      return candles;
    }

    const optimized: Candle[] = [];
    for (let i = 0; i < candles.length; i += 5) {
      optimized.push(candles[i]);
    }

    return optimized;
  }

  /**
   * Add scenario to the list
   */
  addScenario(scenario: ScenarioData): void {
    const currentScenarios = this.scenariosSubject.value;

    // Limit to 6 scenarios
    if (currentScenarios.length >= 6) {
      throw new Error('Maximum of 6 scenarios allowed. Please remove one first.');
    }

    this.scenariosSubject.next([...currentScenarios, scenario]);
  }

  /**
   * Remove scenario from the list
   */
  removeScenario(index: number): void {
    const currentScenarios = this.scenariosSubject.value;
    const updatedScenarios = currentScenarios.filter((_, i) => i !== index);
    this.scenariosSubject.next(updatedScenarios);
  }

  /**
   * Clear all scenarios
   */
  clearAllScenarios(): void {
    this.scenariosSubject.next([]);
  }

  /**
   * Get current scenarios count
   */
  getScenariosCount(): number {
    return this.scenariosSubject.value.length;
  }

  /**
   * Get scenarios array
   */
  getScenarios(): ScenarioData[] {
    return this.scenariosSubject.value;
  }
}
