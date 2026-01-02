'use client';

import { useState, useEffect } from 'react';
import { getAllReceipts, deleteReceipt } from '@/lib/storage';
import type { ReceiptData } from '@/lib/types';

interface HistoryPanelProps {
  onSelectReceipt?: (receipt: ReceiptData) => void;
}

export default function HistoryPanel({ onSelectReceipt }: HistoryPanelProps) {
  const [receipts, setReceipts] = useState<Array<ReceiptData & { id: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
    try {
      const all = await getAllReceipts();
      setReceipts(all);
    } catch (error) {
      console.error('Error loading receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this receipt from history?')) {
      try {
        await deleteReceipt(id);
        await loadReceipts();
      } catch (error) {
        console.error('Error deleting receipt:', error);
        alert('Failed to delete receipt.');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">Loading history...</p>
      </div>
    );
  }

  if (receipts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Receipt History</h3>
        <p className="text-gray-600">No receipts saved yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Receipt History</h3>
        <button
          onClick={loadReceipts}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Refresh
        </button>
      </div>
      <div className="space-y-3">
        {receipts.map((receipt) => (
          <div
            key={receipt.id}
            className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{receipt.patient.name}</p>
                <p className="text-sm text-gray-600">
                  {receipt.payment.chargeDate} • ${receipt.payment.chargedAmount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(receipt.generatedAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 ml-4">
                {onSelectReceipt && (
                  <button
                    onClick={() => onSelectReceipt(receipt)}
                    className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                  >
                    View
                  </button>
                )}
                <button
                  onClick={() => handleDelete(receipt.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

