export interface StripePaymentData {
  chargedAmount: number;
  chargeDate: string;
  planDuration: number; // weeks
  planName?: string;
  confidence: number;
}

export interface PatientDetails {
  name: string;
  dateOfBirth: string;
  coverageStartDate: string;
  coverageEndDate: string;
  state: string;
  medication: string[];
  programType: 'TRT' | 'HRT' | 'Other';
}

export interface BreakdownLineItem {
  description: string;
  quantity?: number;
  unitPrice: number;
  total: number;
}

export interface BreakdownSection {
  name: string;
  lineItems: BreakdownLineItem[];
  subtotal: number;
}

export interface Breakdown {
  pharmacy: BreakdownSection;
  lab: BreakdownSection;
  provider: BreakdownSection;
  operational: BreakdownSection;
  discounts?: BreakdownSection;
  additionalSections?: BreakdownSection[]; // For support, shipping, and other costs
  total: number;
  exceptions: Exception[];
}

export interface Exception {
  type: 'state_exception' | 'plan_mismatch' | 'reallocation' | 'validation';
  message: string;
  details?: Record<string, unknown>;
}

export interface ReceiptData {
  patient: PatientDetails;
  payment: StripePaymentData;
  breakdown: Breakdown;
  generatedAt: string;
  billingProvider?: {
    name: string;
    npi?: string;
  };
  renderingProvider?: {
    name: string;
    npi: string;
  };
}

export interface SpreadsheetData {
  [key: string]: {
    [category: string]: number; // Dynamic categories: pharmacy, lab, provider, operational, support, shipping, etc.
  };
}

export interface OCRResult {
  text: string;
  confidence: number;
  words: Array<{
    text: string;
    confidence: number;
    bbox: { x0: number; y0: number; x1: number; y1: number };
  }>;
}

