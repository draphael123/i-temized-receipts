'use client';

import type { StripePaymentData } from '@/lib/types';

interface PlanResolverPanelProps {
  payment: StripePaymentData;
  onUpdate: (data: Partial<StripePaymentData>) => void;
}

export default function PlanResolverPanel({
  payment,
  onUpdate,
}: PlanResolverPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Configuration</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plan Duration (weeks)
          </label>
          <input
            type="number"
            min="1"
            max="52"
            value={payment.planDuration}
            onChange={(e) =>
              onUpdate({ planDuration: parseInt(e.target.value, 10) || 4 })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Common durations: 4, 8, 12, 16, 24 weeks
          </p>
        </div>

        {payment.planName && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              value={payment.planName}
              onChange={(e) => onUpdate({ planName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}

