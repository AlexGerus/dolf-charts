export interface Candle {
  timestamp: number;
  timeFormatted: string;
  price: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  openInterest: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
  volume: number;
  turnover: number;
}

export interface Statistics {
  totalCandles: number;
  priceStart: number;
  priceEnd: number;
  priceChangePercent: number;
  oiStart: number;
  oiEnd: number;
  oiChangePercent: number;
  avgVolume: number;
  maxVolume: number;
  minVolume: number;
  volatilityPercent: number;
}

export interface ScenarioData {
  scenario: string;
  description: string;
  symbol: string;
  candles: Candle[];
  statistics: Statistics;
}
