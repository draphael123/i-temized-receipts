import type {
  Breakdown,
  BreakdownSection,
  PatientDetails,
  SpreadsheetData,
  StripePaymentData,
  Exception,
} from './types';

// Map spreadsheet column names to display names
const categoryDisplayNames: { [key: string]: string } = {
  pharmacy: 'Pharmacy Costs',
  lab: 'Lab Costs',
  provider: 'Clinical Provider Services',
  operational: 'Operational Costs',
  support: 'Support Services',
  shipping: 'Shipping & Handling',
  discount: 'Discounts',
};

// Get display name for a category
function getCategoryDisplayName(category: string): string {
  return categoryDisplayNames[category.toLowerCase()] || category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ');
}

export function calculateBreakdown(
  payment: StripePaymentData,
  patient: PatientDetails,
  spreadsheet: SpreadsheetData
): Breakdown {
  const exceptions: Exception[] = [];
  const planKey = `${payment.planDuration}w`;

  // Get base costs from spreadsheet
  const baseCosts = spreadsheet[planKey] || spreadsheet['4w'] || {};

  if (!spreadsheet[planKey]) {
    exceptions.push({
      type: 'plan_mismatch',
      message: `Plan duration ${payment.planDuration} weeks not found in spreadsheet, using default`,
      details: { planDuration: payment.planDuration },
    });
  }

  // Get all categories from the spreadsheet (excluding discount)
  const categories = Object.keys(baseCosts).filter(
    (cat) => cat.toLowerCase() !== 'discount'
  );

  // Calculate costs for each category
  const categoryCosts: { [key: string]: number } = {};
  const categorySections: { [key: string]: BreakdownSection } = {};
  const additionalSections: BreakdownSection[] = [];

  // Standard category names
  const standardCategories = ['pharmacy', 'lab', 'provider', 'operational'];

  // Process each category
  for (const category of categories) {
    const categoryLower = category.toLowerCase();
    let cost = baseCosts[category] || 0;

    // Special handling for pharmacy (multiply by medication count)
    if (categoryLower === 'pharmacy') {
      cost = cost * (patient.medication.length || 1);
      categorySections[categoryLower] = {
        name: getCategoryDisplayName(category),
        lineItems: [
          {
            description: `Medication (${patient.medication.join(', ')})`,
            quantity: patient.medication.length || 1,
            unitPrice: baseCosts[category] || 0,
            total: cost,
          },
        ],
        subtotal: cost,
      };
    }
    // Special handling for lab (state exceptions)
    else if (categoryLower === 'lab') {
      if (patient.state === 'NY' || patient.state === 'New York') {
        cost = 0;
        exceptions.push({
          type: 'state_exception',
          message: 'New York state: Lab costs set to $0',
          details: { state: patient.state },
        });
      }
      categorySections[categoryLower] = {
        name: getCategoryDisplayName(category),
        lineItems: [
          {
            description: 'Laboratory Services',
            unitPrice: cost,
            total: cost,
          },
        ],
        subtotal: cost,
      };
    }
    // Special handling for provider
    else if (categoryLower === 'provider') {
      categorySections[categoryLower] = {
        name: getCategoryDisplayName(category),
        lineItems: [
          {
            description: 'Duval Medical P.A.',
            unitPrice: cost,
            total: cost,
          },
        ],
        subtotal: cost,
      };
    }
    // Operational costs - combine with other non-standard costs
    else if (categoryLower === 'operational') {
      categorySections[categoryLower] = {
        name: getCategoryDisplayName(category),
        lineItems: [
          {
            description: getCategoryDisplayName(category),
            unitPrice: cost,
            total: cost,
          },
        ],
        subtotal: cost,
      };
    }
    // Additional categories (support, shipping, etc.) - add as separate sections
    else if (!standardCategories.includes(categoryLower) && cost > 0) {
      additionalSections.push({
        name: getCategoryDisplayName(category),
        lineItems: [
          {
            description: getCategoryDisplayName(category),
            unitPrice: cost,
            total: cost,
          },
        ],
        subtotal: cost,
      });
    }

    categoryCosts[categoryLower] = cost;
  }

  // Handle discount separately (it's negative)
  const discountAmount = baseCosts.discount || baseCosts.Discount || 0;
  const discountSection = discountAmount > 0
    ? {
        name: 'Discounts',
        lineItems: [
          {
            description: 'Discount',
            unitPrice: -discountAmount,
            total: -discountAmount,
          },
        ],
        subtotal: -discountAmount,
      }
    : undefined;

  // Calculate total before discount (include all categories and additional sections)
  const totalBeforeDiscount = 
    Object.values(categoryCosts).reduce((sum, cost) => sum + cost, 0) +
    additionalSections.reduce((sum, section) => sum + section.subtotal, 0);

  // Calculate final total
  let finalTotal = totalBeforeDiscount - discountAmount;

  // Reconcile with Stripe charge amount
  const stripeAmount = payment.chargedAmount;
  const difference = Math.abs(finalTotal - stripeAmount);

  if (difference > 0.01) {
    // Reallocate difference to operational costs (or create operational if it doesn't exist)
    const adjustment = stripeAmount - finalTotal;
    const operationalKey = 'operational';
    
    if (!categorySections[operationalKey]) {
      // Create operational section if it doesn't exist
      categorySections[operationalKey] = {
        name: 'Operational Costs',
        lineItems: [
          {
            description: 'Operational Services',
            unitPrice: adjustment,
            total: adjustment,
          },
        ],
        subtotal: adjustment,
      };
    } else {
      // Adjust existing operational section
      const adjustedOperational = categoryCosts[operationalKey] + adjustment;
      categorySections[operationalKey] = {
        name: categorySections[operationalKey].name,
        lineItems: [
          {
            description: categorySections[operationalKey].lineItems[0].description,
            unitPrice: adjustedOperational,
            total: adjustedOperational,
          },
        ],
        subtotal: adjustedOperational,
      };
      categoryCosts[operationalKey] = adjustedOperational;
    }

    exceptions.push({
      type: 'reallocation',
      message: `Total adjusted by $${adjustment.toFixed(2)} to match Stripe charge`,
      details: {
        calculatedTotal: finalTotal,
        stripeAmount,
        adjustment,
      },
    });

    finalTotal = stripeAmount;
  }

  // Build the breakdown with required sections in order
  // Ensure we have the standard sections, even if they're 0
  const breakdown: Breakdown = {
    pharmacy: categorySections.pharmacy || {
      name: 'Pharmacy Costs',
      lineItems: [],
      subtotal: 0,
    },
    lab: categorySections.lab || {
      name: 'Lab Costs',
      lineItems: [],
      subtotal: 0,
    },
    provider: categorySections.provider || {
      name: 'Clinical Provider Services',
      lineItems: [],
      subtotal: 0,
    },
    operational: categorySections.operational || {
      name: 'Operational Costs',
      lineItems: [],
      subtotal: 0,
    },
    discounts: discountSection,
    additionalSections: additionalSections.length > 0 ? additionalSections : undefined,
    total: finalTotal,
    exceptions,
  };

  return breakdown;
}
