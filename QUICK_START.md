# Quick Start Guide

## Installation & Running

```bash
# 1. Navigate to project directory
cd dolf-charts

# 2. Install dependencies (if not already done)
pnpm install

# 3. Start development server
pnpm start

# 4. Open browser at http://localhost:4200
```

## First Steps

1. **Upload Sample Data**
   - Drag and drop `sample-scenario.json` onto the upload zone
   - Or click to browse and select the file

2. **View Visualizations**
   - See price charts, open interest, and volume graphs
   - Review statistics like price change, volatility, and OI/Price ratio

3. **Upload More Scenarios**
   - Upload up to 6 scenarios total
   - Each will appear as a separate card

4. **Remove Scenarios**
   - Click the trash icon on any scenario card to remove it
   - Or use "Clear All" button to remove all scenarios

## Build for Production

```bash
pnpm run build
```

Output will be in `dist/dolf-charts/`

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start dev server at http://localhost:4200 |
| `pnpm run build` | Build for production |
| `pnpm test` | Run unit tests |
| `pnpm run lint` | Lint code |

## Project Structure Overview

```
src/app/
├── components/          # UI Components
│   ├── file-uploader/   # File upload component
│   ├── scenario-card/   # Scenario display card
│   ├── chart-section/   # Chart visualization
│   └── stats-grid/      # Statistics grid
├── models/              # TypeScript interfaces
├── services/            # Business logic
├── pipes/               # Data formatting pipes
├── app.ts               # Main component
├── app.html             # Main template
└── app.css              # Main styles
```

## Key Features

- ✅ Drag & drop file upload
- ✅ Real-time chart visualization
- ✅ Support for up to 6 scenarios
- ✅ Automatic data optimization
- ✅ Responsive design
- ✅ TypeScript strict mode
- ✅ Dark theme with gradients

## Troubleshooting

**Q: Charts not showing?**
A: Make sure Chart.js providers are registered in app.ts

**Q: Styles not working?**
A: Check that Tailwind CSS is properly configured in styles.css

**Q: Can't upload files?**
A: Ensure files are valid JSON matching the schema

**Q: Error on build?**
A: Run `pnpm install` to ensure all dependencies are installed

## Next Steps

- Customize colors in `tailwind.config.js`
- Modify chart options in `chart-section.component.ts`
- Add more statistics in `stats-grid.component.ts`
- Create custom pipes for data formatting

For full documentation, see README.md
