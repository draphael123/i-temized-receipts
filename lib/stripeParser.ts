import { extractAmount, extractDate, extractWeeks, performOCR } from './ocr';
import type { StripePaymentData, OCRResult } from './types';

export async function parseStripeScreenshot(
  imageFile: File
): Promise<{ data: StripePaymentData; ocrResult: OCRResult }> {
  const ocrResult = await performOCR(imageFile);
  const text = ocrResult.text;

  const chargedAmount = extractAmount(text) || 0;
  const chargeDate = extractDate(text) || new Date().toISOString().split('T')[0];
  const planDuration = extractWeeks(text) || 0; // default to 0 (blank) if not found

  // Try to extract plan name
  const planNameMatch = text.match(/(?:plan|program|membership)[:\s]+([^\n]+)/i);
  const planName = planNameMatch ? planNameMatch[1].trim() : undefined;

  return {
    data: {
      chargedAmount,
      chargeDate,
      planDuration,
      planName,
      confidence: ocrResult.confidence,
    },
    ocrResult,
  };
}

