'use client';

import type { Breakdown } from '@/lib/types';

interface BreakdownPreviewProps {
  breakdown: Breakdown;
}

export default function BreakdownPreview({ breakdown }: BreakdownPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Itemized Breakdown Preview</h3>

      <div className="space-y-6">
        {/* Pharmacy Costs */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">{breakdown.pharmacy.name}</h4>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Unit Price
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {breakdown.pharmacy.lineItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-2 text-sm text-gray-500 text-right">
                      {item.quantity || '-'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500 text-right">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-4 py-2 text-sm font-semibold text-gray-900">
                    Subtotal
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-900 text-right">
                    ${breakdown.pharmacy.subtotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Lab Costs */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">{breakdown.lab.name}</h4>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Unit Price
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {breakdown.lab.lineItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-2 text-sm text-gray-500 text-right">-</td>
                    <td className="px-4 py-2 text-sm text-gray-500 text-right">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-4 py-2 text-sm font-semibold text-gray-900">
                    Subtotal
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-900 text-right">
                    ${breakdown.lab.subtotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Provider Services */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">{breakdown.provider.name}</h4>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Unit Price
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {breakdown.provider.lineItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-2 text-sm text-gray-500 text-right">-</td>
                    <td className="px-4 py-2 text-sm text-gray-500 text-right">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-4 py-2 text-sm font-semibold text-gray-900">
                    Subtotal
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-900 text-right">
                    ${breakdown.provider.subtotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Costs */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">{breakdown.operational.name}</h4>
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Unit Price
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {breakdown.operational.lineItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-2 text-sm text-gray-500 text-right">-</td>
                    <td className="px-4 py-2 text-sm text-gray-500 text-right">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                      ${item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td colSpan={3} className="px-4 py-2 text-sm font-semibold text-gray-900">
                    Subtotal
                  </td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-900 text-right">
                    ${breakdown.operational.subtotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Discounts */}
        {breakdown.discounts && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{breakdown.discounts.name}</h4>
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                      Unit Price
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {breakdown.discounts.lineItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 text-sm text-gray-900">{item.description}</td>
                      <td className="px-4 py-2 text-sm text-gray-500 text-right">-</td>
                      <td className="px-4 py-2 text-sm text-gray-500 text-right">
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                        ${item.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td colSpan={3} className="px-4 py-2 text-sm font-semibold text-gray-900">
                      Subtotal
                    </td>
                    <td className="px-4 py-2 text-sm font-semibold text-gray-900 text-right">
                      ${breakdown.discounts.subtotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="border-t-2 border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">TOTAL COST</span>
            <span className="text-2xl font-bold text-primary-600">
              ${breakdown.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Exceptions */}
        {breakdown.exceptions.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Notes & Exceptions</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
              {breakdown.exceptions.map((exception, idx) => (
                <li key={idx}>{exception.message}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

