# Itemized Receipt Generator

A Next.js web application that generates Fountain-style itemized receipts from Stripe screenshots, using the Membership Payment Breakdowns spreadsheet as the source of truth.

## Features

- **Client-Side OCR**: Uses tesseract.js (WASM) to extract payment details from Stripe screenshots
- **Local Processing**: All processing occurs in the browser - no data is uploaded to servers
- **Spreadsheet-Based Logic**: Uses the Membership Payment Breakdowns spreadsheet for cost calculations
- **Document Generation**: Generates DOCX (primary) and PDF receipts matching the official template
- **State-Based Exceptions**: Automatically applies state-specific rules (e.g., NY labs = $0)
- **Validation**: Ensures totals reconcile with Stripe charges
- **Local Storage**: Optional IndexedDB storage for receipt history

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Place the Membership Payment Breakdowns spreadsheet in `/public/data/membership-payment-breakdowns.xlsx`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This application is designed to be deployed on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build

## Usage

1. **Upload Screenshot**: Upload a PNG/JPG screenshot of a Stripe payment page
2. **Confirm Details**: Review and correct OCR-extracted payment details
3. **Enter Patient Info**: Fill in patient details, program type, and medication
4. **Preview Breakdown**: Review the calculated itemized breakdown
5. **Generate Receipt**: Download the receipt as DOCX or PDF

## Project Structure

```
/app
  /page.tsx              # Home page
  /how-it-works/page.tsx # How it works page
  /privacy/page.tsx     # Privacy page
  /app/page.tsx         # Main receipt generator wizard
  /app/components/      # Wizard step components
/lib
  ocr.ts                # OCR processing
  stripeParser.ts       # Stripe screenshot parsing
  spreadsheetLoader.ts  # XLSX loading
  breakdownEngine.ts    # Cost breakdown calculation
  breakdownValidator.ts # Validation logic
  templateDocx.ts       # DOCX generation
  templatePdf.ts        # PDF generation
  storage.ts            # IndexedDB storage
  types.ts              # TypeScript types
/public
  /data/                # Spreadsheet location
```

## Spreadsheet Format

The Membership Payment Breakdowns spreadsheet should have the following structure:

| Plan Duration | Pharmacy | Lab | Provider | Operational | Discount |
|--------------|----------|-----|----------|-------------|----------|
| 4w           | 100.00   | 50  | 75.00    | 25.00       | 0        |
| 8w           | 200.00   | 100 | 150.00   | 50.00       | 0        |

The first column should contain plan durations (e.g., "4w", "8w", "12w"), and subsequent columns contain the cost breakdowns.

## Privacy & Security

- All processing occurs locally in the browser
- Screenshots are never uploaded to servers
- Optional local storage uses IndexedDB (browser-only)
- No backend APIs or cloud storage

## License

Internal Fountain Vitality tool - All rights reserved.

