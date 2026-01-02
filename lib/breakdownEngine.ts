import type {
  Breakdown,
  BreakdownSection,
  PatientDetails,
  SpreadsheetData,
  StripePaymentData,
  Exception,
} from './types';

export function calculateBreakdown(
  payment: StripePaymentData,
  patient: PatientDetails,
  spreadsheet: SpreadsheetData
): Breakdown {
  const exceptions: Exception[] = [];
  const planKey = `${payment.planDuration}w`;

  // Get base costs from spreadsheet
  const baseCosts = spreadsheet[planKey] || spreadsheet['4w'] || {
    pharmacy: 0,
    lab: 0,
    provider: 0,
    operational: 0,
  };

  if (!spreadsheet[planKey]) {
    exceptions.push({
      type: 'plan_mismatch',
      message: `Plan duration ${payment.planDuration} weeks not found in spreadsheet, using default`,
      details: { planDuration: payment.planDuration },
    });
  }

  // Apply state-based exceptions
  let labCost = baseCosts.lab;
  if (patient.state === 'NY' || patient.state === 'New York') {
    labCost = 0;
    exceptions.push({
      type: 'state_exception',
      message: 'New York state: Lab costs set to $0',
      details: { state: patient.state },
    });
  }

  // Calculate pharmacy costs (may vary by medication)
  const pharmacyCost = baseCosts.pharmacy * (patient.medication.length || 1);

  // Calculate provider services
  const providerCost = baseCosts.provider;

  // Calculate operational costs
  const operationalCost = baseCosts.operational;

  // Calculate discounts if applicable
  const discountAmount = baseCosts.discount || 0;

  // Calculate subtotals
  const pharmacySubtotal = pharmacyCost;
  const labSubtotal = labCost;
  const providerSubtotal = providerCost;
  const operationalSubtotal = operationalCost;
  const discountSubtotal = discountAmount;

  // Calculate total before discount
  const totalBeforeDiscount =
    pharmacySubtotal +
    labSubtotal +
    providerSubtotal +
    operationalSubtotal;

  // Calculate final total
  let finalTotal = totalBeforeDiscount - discountSubtotal;

  // Reconcile with Stripe charge amount
  const stripeAmount = payment.chargedAmount;
  const difference = Math.abs(finalTotal - stripeAmount);

  if (difference > 0.01) {
    // Reallocate difference to operational costs
    const adjustment = stripeAmount - finalTotal;
    const adjustedOperational = operationalSubtotal + adjustment;

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

    // Update operational section
    return {
      pharmacy: {
        name: 'Pharmacy Costs',
        lineItems: [
          {
            description: `Medication (${patient.medication.join(', ')})`,
            quantity: patient.medication.length || 1,
            unitPrice: baseCosts.pharmacy,
            total: pharmacySubtotal,
          },
        ],
        subtotal: pharmacySubtotal,
      },
      lab: {
        name: 'Lab Costs',
        lineItems: [
          {
            description: 'Laboratory Services',
            unitPrice: labCost,
            total: labSubtotal,
          },
        ],
        subtotal: labSubtotal,
      },
      provider: {
        name: 'Clinical Provider Services',
        lineItems: [
          {
            description: 'Duval Medical P.A.',
            unitPrice: providerCost,
            total: providerSubtotal,
          },
        ],
        subtotal: providerSubtotal,
      },
      operational: {
        name: 'Operational Costs',
        lineItems: [
          {
            description: 'Operational Services',
            unitPrice: adjustedOperational,
            total: adjustedOperational,
          },
        ],
        subtotal: adjustedOperational,
      },
      discounts: discountSubtotal > 0
        ? {
            name: 'Discounts',
            lineItems: [
              {
                description: 'Discount',
                unitPrice: -discountSubtotal,
                total: -discountSubtotal,
              },
            ],
            subtotal: -discountSubtotal,
          }
        : undefined,
      total: finalTotal,
      exceptions,
    };
  }

  return {
    pharmacy: {
      name: 'Pharmacy Costs',
      lineItems: [
        {
          description: `Medication (${patient.medication.join(', ')})`,
          quantity: patient.medication.length || 1,
          unitPrice: baseCosts.pharmacy,
          total: pharmacySubtotal,
        },
      ],
      subtotal: pharmacySubtotal,
    },
    lab: {
      name: 'Lab Costs',
      lineItems: [
        {
          description: 'Laboratory Services',
          unitPrice: labCost,
          total: labSubtotal,
        },
      ],
      subtotal: labSubtotal,
    },
    provider: {
      name: 'Clinical Provider Services',
      lineItems: [
        {
          description: 'Duval Medical P.A.',
          unitPrice: providerCost,
          total: providerSubtotal,
        },
      ],
      subtotal: providerSubtotal,
    },
    operational: {
      name: 'Operational Costs',
      lineItems: [
        {
          description: 'Operational Services',
          unitPrice: operationalCost,
          total: operationalSubtotal,
        },
      ],
      subtotal: operationalSubtotal,
    },
    discounts: discountSubtotal > 0
      ? {
          name: 'Discounts',
          lineItems: [
            {
              description: 'Discount',
              unitPrice: -discountSubtotal,
              total: -discountSubtotal,
            },
          ],
          subtotal: -discountSubtotal,
        }
      : undefined,
    total: finalTotal,
    exceptions,
  };
}

