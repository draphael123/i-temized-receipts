import { createWorker } from 'tesseract.js';
import type { OCRResult } from './types';

export async function performOCR(imageFile: File): Promise<OCRResult> {
  const worker = await createWorker('eng');
  
  try {
    const { data } = await worker.recognize(imageFile);
    
    const words = data.words.map((word) => ({
      text: word.text,
      confidence: word.confidence || 0,
      bbox: {
        x0: word.bbox.x0,
        y0: word.bbox.y0,
        x1: word.bbox.x1,
        y1: word.bbox.y1,
      },
    }));

    const avgConfidence = words.length > 0
      ? words.reduce((sum, w) => sum + w.confidence, 0) / words.length
      : 0;

    return {
      text: data.text,
      confidence: avgConfidence,
      words,
    };
  } finally {
    await worker.terminate();
  }
}

export function extractAmount(text: string): number | null {
  // Look for currency patterns: $123.45, USD 123.45, 123.45
  const patterns = [
    /\$[\d,]+\.?\d*/,
    /USD\s*[\d,]+\.?\d*/,
    /[\d,]+\.\d{2}/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const amountStr = match[0].replace(/[$,USD\s]/g, '');
      const amount = parseFloat(amountStr);
      if (!isNaN(amount) && amount > 0) {
        return amount;
      }
    }
  }

  return null;
}

export function extractDate(text: string): string | null {
  // Look for date patterns: MM/DD/YYYY, YYYY-MM-DD, etc.
  const patterns = [
    /\d{1,2}\/\d{1,2}\/\d{4}/,
    /\d{4}-\d{2}-\d{2}/,
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const dateStr = match[0];
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
    }
  }

  return null;
}

export function extractWeeks(text: string): number | null {
  // Look for week patterns: "4 weeks", "4-week", "4w", etc.
  const patterns = [
    /(\d+)\s*week/i,
    /(\d+)\s*w/i,
    /(\d+)-week/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const weeks = parseInt(match[1], 10);
      if (!isNaN(weeks) && weeks > 0 && weeks <= 52) {
        return weeks;
      }
    }
  }

  return null;
}

