'use client';

import type { StripePaymentData } from '@/lib/types';

interface OcrReviewPanelProps {
  data: StripePaymentData;
  onUpdate: (data: Partial<StripePaymentData>) => void;
  onConfirm: () => void;
}

export default function OcrReviewPanel({
  data,
  onUpdate,
  onConfirm,
}: OcrReviewPanelProps) {
  const isLowConfidence = data.confidence < 70;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Review Extracted Payment Details
        </h3>
        {isLowConfidence && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
            <p className="text-sm text-yellow-800">
              ⚠️ Low OCR confidence ({data.confidence.toFixed(1)}%). Please verify all values.
            </p>
          </div>
        )}
      </div>

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
            Plan Duration (weeks)
          </label>
          <input
            type="number"
            min="1"
            max="52"
            value={data.planDuration}
            onChange={(e) =>
              onUpdate({ planDuration: parseInt(e.target.value, 10) || 4 })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {data.planName && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plan Name (optional)
            </label>
            <input
              type="text"
              value={data.planName}
              onChange={(e) => onUpdate({ planName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        )}
      </div>

      <button
        onClick={onConfirm}
        className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
      >
        Confirm Payment Details
      </button>
    </div>
  );
}

