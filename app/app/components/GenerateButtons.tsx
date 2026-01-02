'use client';

import { useState } from 'react';
import { saveAs } from 'file-saver';
import { generateDocx } from '@/lib/templateDocx';
import { generatePdfDocument } from '@/lib/templatePdf';
import { pdf } from '@react-pdf/renderer';
import type { ReceiptData } from '@/lib/types';

interface GenerateButtonsProps {
  receiptData: ReceiptData;
  onSave?: () => void;
}

export default function GenerateButtons({ receiptData, onSave }: GenerateButtonsProps) {
  const [generating, setGenerating] = useState<'docx' | 'pdf' | null>(null);

  const handleGenerateDocx = async () => {
    try {
      setGenerating('docx');
      const blob = await generateDocx(receiptData);
      const fileName = `receipt-${receiptData.patient.name.replace(/\s+/g, '-')}-${receiptData.payment.chargeDate}.docx`;
      saveAs(blob, fileName);
      if (onSave) onSave();
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Failed to generate DOCX. Please try again.');
    } finally {
      setGenerating(null);
    }
  };

  const handleGeneratePdf = async () => {
    try {
      setGenerating('pdf');
      const doc = generatePdfDocument(receiptData);
      const blob = await pdf(doc).toBlob();
      const fileName = `receipt-${receiptData.patient.name.replace(/\s+/g, '-')}-${receiptData.payment.chargeDate}.pdf`;
      saveAs(blob, fileName);
      if (onSave) onSave();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleGenerateDocx}
        disabled={generating !== null}
        className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {generating === 'docx' ? 'Generating...' : 'Download DOCX (Primary)'}
      </button>
      <button
        onClick={handleGeneratePdf}
        disabled={generating !== null}
        className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {generating === 'pdf' ? 'Generating...' : 'Download PDF'}
      </button>
    </div>
  );
}

