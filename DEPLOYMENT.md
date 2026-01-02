# Deployment Guide

## Vercel Deployment

This application is configured for deployment on Vercel.

### Steps

1. **Prepare the Spreadsheet**
   - Place `membership-payment-breakdowns.xlsx` in `/public/data/`
   - Ensure it follows the format described in `/public/data/README.md`

2. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel will auto-detect Next.js
   - Click "Deploy"

4. **Environment Variables**
   - None required for v1 (all processing is client-side)

5. **Post-Deployment**
   - Verify the spreadsheet loads at `/public/data/membership-payment-breakdowns.xlsx`
   - Test OCR functionality with a sample Stripe screenshot
   - Verify DOCX and PDF generation

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Browser Compatibility

- Chrome/Edge (Chromium): Full support
- Firefox: Full support
- Safari: Full support (may have slower OCR performance)

## Performance Notes

- First OCR run may be slow (tesseract.js WASM initialization)
- Large spreadsheets may take a moment to parse
- PDF generation is client-side and may take a few seconds

## Troubleshooting

### OCR Not Working
- Ensure screenshots are clear and high resolution
- Check browser console for errors
- Verify tesseract.js loaded correctly

### Spreadsheet Not Loading
- Verify file is in `/public/data/membership-payment-breakdowns.xlsx`
- Check file format matches expected structure
- Try uploading manually in the app

### PDF Generation Fails
- Check browser console for errors
- Ensure @react-pdf/renderer is properly installed
- Try DOCX generation as alternative

