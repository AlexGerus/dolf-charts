# DOLF Strategy Analytics

Advanced Trading Data Visualization Platform built with Angular 18+ and Chart.js

![DOLF Strategy Analytics](https://img.shields.io/badge/Angular-18%2B-red)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-blue)
![Chart.js](https://img.shields.io/badge/Chart.js-4.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)

## Features

- 📊 **TradingView-style Candlestick Charts** - Professional OHLC visualization with bodies and wicks
- 🖱️ **Advanced Zoom & Pan** - Mouse wheel zoom, drag to pan, +/- buttons, fit-to-data
- 📏 **Visual Measurement Tool** - Click two points to measure price change %, time period, and candle count
- ⏰ **Time-based X-axis** - Accurate timestamp display (HH:mm format)
- 💡 **Detailed Tooltips** - Hover over candles to see OHLC values with percentage change
- 📈 **Multiple Scenario Support** - Load up to 6 trading scenarios simultaneously
- 🎨 **Modern Dark Theme** - Beautiful gradient UI with Tailwind CSS
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Performance Optimized** - OnPush change detection and optimized rendering
- 🔒 **TypeScript Strict Mode** - Full type safety and compile-time checks
- 🎯 **Drag & Drop Upload** - Easy JSON file upload with validation

## Tech Stack

- **Framework**: Angular 18+ (Standalone Components)
- **Charts**: Chart.js 4.x with ng2-charts
- **Financial Charts**: chartjs-chart-financial (Candlestick charts)
- **Chart Zoom**: chartjs-plugin-zoom (TradingView-style zoom & pan)
- **Time Adapter**: chartjs-adapter-date-fns (Time-based X-axis)
- **Date Library**: date-fns 4.x (Date formatting)
- **Styling**: Tailwind CSS 3.x
- **Language**: TypeScript (Strict Mode)
- **Package Manager**: pnpm
- **State Management**: RxJS BehaviorSubject
- **Touch Support**: HammerJS (Mobile pinch-to-zoom)

## Project Structure

```
dolf-charts/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── file-uploader/      # File upload component
│   │   │   ├── scenario-card/      # Scenario display card
│   │   │   ├── chart-section/      # Charts visualization
│   │   │   └── stats-grid/         # Statistics grid
│   │   ├── models/
│   │   │   └── scenario.model.ts   # Data interfaces
│   │   ├── services/
│   │   │   └── scenario.service.ts # Business logic
│   │   ├── pipes/
│   │   │   ├── number-format.pipe.ts     # Number formatting
│   │   │   └── percentage-format.pipe.ts # Percentage formatting
│   │   ├── app.ts                  # Main component
│   │   ├── app.html                # Main template
│   │   └── app.css                 # Main styles
│   └── styles.css                  # Global styles
├── sample-scenario.json            # Example data file
├── tailwind.config.js              # Tailwind configuration
└── package.json                    # Dependencies
```

## Installation

### Prerequisites

- Node.js 18+ (recommended: 20+)
- pnpm (install with `npm install -g pnpm`)

### Quick Start

1. **Clone or navigate to the project directory**:
   ```bash
   cd dolf-charts
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Start development server**:
   ```bash
   pnpm start
   ```

4. **Open browser**:
   Navigate to `http://localhost:4200`

5. **Build for production**:
   ```bash
   pnpm run build
   ```
   Output will be in `dist/dolf-charts/`

## 🚀 Deploy to Vercel

This project is ready for one-click deployment to Vercel!

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/dolf-charts)

### Manual Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login to Vercel
vercel login

# Deploy (preview)
pnpm run preview

# Deploy to production
pnpm run deploy
```

### Or use the deployment script:

```bash
./deploy.sh
```

For detailed deployment instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

## Usage

### Loading Scenarios

1. Click or drag JSON files onto the upload zone
2. Upload up to 6 scenario files at once
3. Each scenario will display as a separate card with charts

### JSON Data Format

The application expects JSON files in the following format:

```json
{
  "scenario": "Scenario 1: Deep Sleep",
  "description": "Description of the trading scenario...",
  "symbol": "BTCUSDT",
  "candles": [
    {
      "timestamp": 1763809479802,
      "timeFormatted": "0m",
      "price": {
        "open": 50000.0,
        "high": 50100.0,
        "low": 49900.0,
        "close": 50000.0
      },
      "openInterest": {
        "open": 1000000.0,
        "high": 1001000.0,
        "low": 999000.0,
        "close": 1000000.0
      },
      "volume": 35000.0,
      "turnover": 1750000000.0
    }
  ],
  "statistics": {
    "totalCandles": 950,
    "priceStart": 50000.0,
    "priceEnd": 50400.0,
    "priceChangePercent": 0.8,
    "oiStart": 1000000.0,
    "oiEnd": 1005000.0,
    "oiChangePercent": 0.5,
    "avgVolume": 35000.0,
    "maxVolume": 50000.0,
    "minVolume": 25000.0,
    "volatilityPercent": 0.8
  }
}
```

### Sample Data

A sample scenario file (`sample-scenario.json`) is included in the project root. Use it to test the application:

1. Start the development server
2. Drag and drop `sample-scenario.json` onto the upload zone
3. View the visualized data

## Features Deep Dive

### Statistics Grid

Each scenario displays key metrics:
- **Total Candles** - Number of data points
- **Price Change** - Percentage change with color coding (green/red)
- **OI Change** - Open Interest percentage change
- **OI/Price Ratio** - Correlation indicator (≥2.0 = strong)
- **Volatility** - Market volatility indicator (<2.5% = low)
- **Average Volume** - Trading volume statistics

### Interactive Charts (TradingView-style)

Three professional trading charts per scenario with full TradingView functionality:

1. **Price Chart (Candlestick)** - Professional OHLC visualization
   - Green/Red candlestick bodies with wicks for bullish/bearish moves
   - Hover to see Open, High, Low, Close values with percentage change
   - Time-based X-axis (HH:mm format)

2. **Open Interest Chart (Candlestick)** - OI OHLC data
   - Orange/Red candlesticks for OI changes
   - Detailed tooltip with all OHLC values
   - Synchronized zoom across all charts

3. **Volume Chart (Bars)** - Trading volume visualization
   - Green bars for price increase, red for decrease
   - Time-synchronized with price charts
   - Detailed volume information on hover

**Chart Controls (TradingView-style):**
- 🖱️ **Mouse wheel** - Zoom in/out (smooth, precise control)
- 👆 **Click & drag** - Pan left/right across time
- ➕ **+ button** - Zoom in
- ➖ **- button** - Zoom out
- 🔄 **Fit button** - Reset zoom to fit all data
- 📏 **Measure tool** - Click to activate, then click two points to measure:
  - Percentage change between points
  - Time period (candle count)
  - Visual line with markers on chart
- 📱 **Pinch-to-zoom** on mobile devices

### Data Optimization

- Automatically optimizes large datasets (>500 candles)
- Takes every 5th candle to maintain performance
- Smooth animations and transitions

## Development

### Available Scripts

```bash
# Start development server
pnpm start

# Build for production
pnpm run build

# Run tests
pnpm test

# Lint code
pnpm run lint
```

### Code Style

- **Components**: OnPush change detection for performance
- **Services**: Injectable with providedIn: 'root'
- **Pipes**: Standalone for easy reuse
- **Types**: Strict TypeScript with full type safety
- **Styling**: Utility-first with Tailwind CSS

### Architecture Patterns

- **Standalone Components** - No NgModule required (Angular 18+)
- **Reactive Programming** - RxJS for state management
- **Smart/Dumb Components** - Clear separation of concerns
- **Service Layer** - Business logic separated from UI

## Performance Optimizations

- ✅ OnPush change detection strategy
- ✅ Lazy loading of scenarios
- ✅ Automatic data optimization for large datasets
- ✅ Debounced file processing
- ✅ Efficient chart rendering with Chart.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: '#00ff88',     // Green accent
  danger: '#ff4444',      // Red for negative values
  warning: '#ffa500',     // Orange for warnings
  'dark-bg': '#0f0f23',   // Dark background
}
```

### Chart Configuration

Edit chart options in `chart-section.component.ts` to customize:
- Colors
- Tooltips
- Grid lines
- Scales
- Animations

## Troubleshooting

### Charts not rendering?

Make sure Chart.js is properly registered in `app.ts`:
```typescript
providers: [provideCharts(withDefaultRegisterables())]
```

### Tailwind styles not applying?

1. Check `styles.css` has the Tailwind directives
2. Verify `tailwind.config.js` content paths
3. Restart development server

### File upload not working?

1. Ensure files are valid JSON
2. Check file format matches the schema
3. Maximum 6 scenarios allowed

## Contributing

This is a specialized trading data visualization tool. For bugs or feature requests, please create an issue.

## License

MIT License - feel free to use this project for your own trading analytics needs.

## Acknowledgments

- Built with Angular 18+
- Charts powered by Chart.js
- Styled with Tailwind CSS
- Icons from Heroicons

---

**DOLF Strategy Analytics** &copy; 2024 | Advanced Trading Visualization
