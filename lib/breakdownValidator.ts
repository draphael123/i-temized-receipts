import type { Breakdown } from './types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateBreakdown(breakdown: Breakdown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate pharmacy section
  const pharmacySubtotal = breakdown.pharmacy.lineItems.reduce(
    (sum, item) => sum + item.total,
    0
  );
  if (Math.abs(pharmacySubtotal - breakdown.pharmacy.subtotal) > 0.01) {
    errors.push(
      `Pharmacy section: Line items total ($${pharmacySubtotal.toFixed(2)}) does not match subtotal ($${breakdown.pharmacy.subtotal.toFixed(2)})`
    );
  }

  // Validate lab section
  const labSubtotal = breakdown.lab.lineItems.reduce(
    (sum, item) => sum + item.total,
    0
  );
  if (Math.abs(labSubtotal - breakdown.lab.subtotal) > 0.01) {
    errors.push(
      `Lab section: Line items total ($${labSubtotal.toFixed(2)}) does not match subtotal ($${breakdown.lab.subtotal.toFixed(2)})`
    );
  }

  // Validate provider section
  const providerSubtotal = breakdown.provider.lineItems.reduce(
    (sum, item) => sum + item.total,
    0
  );
  if (Math.abs(providerSubtotal - breakdown.provider.subtotal) > 0.01) {
    errors.push(
      `Provider section: Line items total ($${providerSubtotal.toFixed(2)}) does not match subtotal ($${breakdown.provider.subtotal.toFixed(2)})`
    );
  }

  // Validate operational section
  const operationalSubtotal = breakdown.operational.lineItems.reduce(
    (sum, item) => sum + item.total,
    0
  );
  if (Math.abs(operationalSubtotal - breakdown.operational.subtotal) > 0.01) {
    errors.push(
      `Operational section: Line items total ($${operationalSubtotal.toFixed(2)}) does not match subtotal ($${breakdown.operational.subtotal.toFixed(2)})`
    );
  }

  // Validate discounts section if present
  if (breakdown.discounts) {
    const discountSubtotal = breakdown.discounts.lineItems.reduce(
      (sum, item) => sum + item.total,
      0
    );
    if (Math.abs(discountSubtotal - breakdown.discounts.subtotal) > 0.01) {
      errors.push(
        `Discounts section: Line items total ($${discountSubtotal.toFixed(2)}) does not match subtotal ($${breakdown.discounts.subtotal.toFixed(2)})`
      );
    }
  }

  // Validate final total
  const calculatedTotal =
    breakdown.pharmacy.subtotal +
    breakdown.lab.subtotal +
    breakdown.provider.subtotal +
    breakdown.operational.subtotal +
    (breakdown.discounts ? breakdown.discounts.subtotal : 0);

  if (Math.abs(calculatedTotal - breakdown.total) > 0.01) {
    errors.push(
      `Final total: Calculated total ($${calculatedTotal.toFixed(2)}) does not match breakdown total ($${breakdown.total.toFixed(2)})`
    );
  }

  // Check for exceptions
  if (breakdown.exceptions.length > 0) {
    warnings.push(
      `${breakdown.exceptions.length} exception(s) were applied during calculation`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

