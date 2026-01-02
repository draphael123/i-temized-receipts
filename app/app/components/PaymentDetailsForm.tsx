'use client';

import type { StripePaymentData } from '@/lib/types';

interface PaymentDetailsFormProps {
  data: StripePaymentData;
  onUpdate: (data: Partial<StripePaymentData>) => void;
}

export default function PaymentDetailsForm({ data, onUpdate }: PaymentDetailsFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Charged Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={data.chargedAmount}
            onChange={(e) =>
              onUpdate({ chargedAmount: parseFloat(e.target.value) || 0 })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Charge Date
          </label>
          <input
            type="date"
            value={data.chargeDate}
            onChange={(e) => onUpdate({ chargeDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan Duration (weeks) *
          </label>
          <input
            type="number"
            min="1"
            max="52"
            value={data.planDuration || ''}
            onChange={(e) => {
              const value = e.target.value;
              onUpdate({ planDuration: value === '' ? 0 : parseInt(value, 10) || 0 });
            }}
            placeholder="Enter plan duration"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
    </div>
  );
}

