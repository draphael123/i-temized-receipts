'use client';

import { useState, useEffect } from 'react';
import UploadStripeScreenshots from './components/UploadStripeScreenshots';
import OcrReviewPanel from './components/OcrReviewPanel';
import PaymentDetailsForm from './components/PaymentDetailsForm';
import PatientDetailsForm from './components/PatientDetailsForm';
import PlanResolverPanel from './components/PlanResolverPanel';
import BreakdownPreview from './components/BreakdownPreview';
import GenerateButtons from './components/GenerateButtons';
import { parseStripeScreenshot } from '@/lib/stripeParser';
import { loadSpreadsheetFromPublic, loadSpreadsheetFromFile } from '@/lib/spreadsheetLoader';
import { calculateBreakdown } from '@/lib/breakdownEngine';
import { validateBreakdown } from '@/lib/breakdownValidator';
import { saveReceipt } from '@/lib/storage';
import type {
  StripePaymentData,
  PatientDetails,
  Breakdown,
  ReceiptData,
  SpreadsheetData,
} from '@/lib/types';

type Step = 'upload' | 'confirm' | 'patient' | 'preview' | 'generate';

export default function ReceiptGenerator() {
  const [step, setStep] = useState<Step>('upload');
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetData | null>(null);
  const [spreadsheetError, setSpreadsheetError] = useState<string | null>(null);
  const [payment, setPayment] = useState<StripePaymentData | null>(null);
  const [patient, setPatient] = useState<PatientDetails>({
    name: '',
    dateOfBirth: '',
    coverageStartDate: '',
    coverageEndDate: '',
    state: '',
    medication: [],
    programType: 'TRT',
  });
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } | null>(null);
  const [processing, setProcessing] = useState(false);

  // Load spreadsheet on mount
  useEffect(() => {
    loadSpreadsheetFromPublic()
      .then(setSpreadsheet)
      .catch((error) => {
        console.error('Failed to load spreadsheet:', error);
        setSpreadsheetError(
          'Failed to load spreadsheet. Please upload it manually below.'
        );
      });
  }, []);

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    setProcessing(true);
    try {
      const file = files[0];
      const { data } = await parseStripeScreenshot(file);
      setPayment(data);
      setStep('confirm');
    } catch (error) {
      console.error('Error processing screenshot:', error);
      alert('Failed to process screenshot. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleSpreadsheetUpload = async (file: File) => {
    setProcessing(true);
    try {
      const data = await loadSpreadsheetFromFile(file);
      setSpreadsheet(data);
      setSpreadsheetError(null);
    } catch (error) {
      console.error('Error loading spreadsheet:', error);
      setSpreadsheetError('Failed to load spreadsheet. Please check the file format.');
    } finally {
      setProcessing(false);
    }
  };

  const handleConfirmPayment = () => {
    if (!payment) return;
    setStep('patient');
  };

  const handlePatientSubmit = () => {
    if (!payment || !spreadsheet) return;

    // Validate patient data
    if (
      !patient.name ||
      !patient.dateOfBirth ||
      !patient.coverageStartDate ||
      !patient.coverageEndDate ||
      !patient.state ||
      patient.medication.length === 0
    ) {
      alert('Please fill in all required patient fields.');
      return;
    }

    // Calculate breakdown
    const calculatedBreakdown = calculateBreakdown(payment, patient, spreadsheet);
    setBreakdown(calculatedBreakdown);

    // Validate breakdown
    const validation = validateBreakdown(calculatedBreakdown);
    setValidationResult(validation);

    setStep('preview');
  };

  const handleGenerate = async () => {
    if (!payment || !breakdown) return;

    const receiptData: ReceiptData = {
      patient,
      payment,
      breakdown,
      generatedAt: new Date().toISOString(),
      billingProvider: {
        name: 'Fountain Vitality',
      },
      renderingProvider: {
        name: 'Duval Medical P.A.',
        npi: '1234567890', // Replace with actual NPI
      },
    };

    try {
      await saveReceipt(receiptData);
    } catch (error) {
      console.error('Error saving receipt:', error);
    }

    setStep('generate');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Receipt Generator</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {(['upload', 'confirm', 'patient', 'preview', 'generate'] as Step[]).map(
              (s, idx) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step === s
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : idx <
                          (['upload', 'confirm', 'patient', 'preview', 'generate'] as Step[]).indexOf(
                            step
                          )
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'bg-white border-gray-300 text-gray-500'
                    }`}
                  >
                    {idx <
                    (['upload', 'confirm', 'patient', 'preview', 'generate'] as Step[]).indexOf(
                      step
                    ) ? (
                      '✓'
                    ) : (
                      idx + 1
                    )}
                  </div>
                  {idx < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        idx <
                        (['upload', 'confirm', 'patient', 'preview', 'generate'] as Step[]).indexOf(
                          step
                        )
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  )}
                </div>
              )
            )}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Upload</span>
            <span>Confirm</span>
            <span>Patient</span>
            <span>Preview</span>
            <span>Generate</span>
          </div>
        </div>

        {/* Spreadsheet Upload (if not loaded) */}
        {!spreadsheet && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Spreadsheet Required
            </h3>
            <p className="text-yellow-700 mb-4">
              {spreadsheetError ||
                'Please upload the Membership Payment Breakdowns spreadsheet.'}
            </p>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleSpreadsheetUpload(file);
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>
        )}

        {/* Step Content */}
        {step === 'upload' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Step 1: Upload Stripe Screenshot
            </h2>
            {processing ? (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Processing screenshot...</p>
              </div>
            ) : (
              <UploadStripeScreenshots onUpload={handleUpload} />
            )}
          </div>
        )}

        {step === 'confirm' && payment && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Step 2: Confirm Payment Details
            </h2>
            <OcrReviewPanel
              data={payment}
              onUpdate={(updates) => setPayment({ ...payment, ...updates })}
              onConfirm={handleConfirmPayment}
            />
          </div>
        )}

        {step === 'patient' && payment && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Step 3: Enter Patient & Program Details
            </h2>
            <div className="mb-6">
              <PaymentDetailsForm
                data={payment}
                onUpdate={(updates) => setPayment({ ...payment, ...updates })}
              />
            </div>
            <PatientDetailsForm
              data={patient}
              onUpdate={(updates) => setPatient({ ...patient, ...updates })}
            />
            <button
              onClick={handlePatientSubmit}
              className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Calculate Breakdown
            </button>
          </div>
        )}

        {step === 'preview' && breakdown && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Step 4: Preview Breakdown
            </h2>
            {validationResult && (
              <div className="mb-6">
                {validationResult.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                    <h4 className="font-semibold text-red-800 mb-2">Validation Errors</h4>
                    <ul className="list-disc list-inside text-sm text-red-700">
                      {validationResult.errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {validationResult.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Warnings</h4>
                    <ul className="list-disc list-inside text-sm text-yellow-700">
                      {validationResult.warnings.map((warning, idx) => (
                        <li key={idx}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {validationResult.isValid && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                    <p className="text-sm text-green-700">
                      ✓ Breakdown is valid and reconciles with Stripe charge.
                    </p>
                  </div>
                )}
              </div>
            )}
            <BreakdownPreview breakdown={breakdown} />
            <button
              onClick={handleGenerate}
              className="mt-6 w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Proceed to Generate
            </button>
          </div>
        )}

        {step === 'generate' && payment && breakdown && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Step 5: Generate Receipt
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <p className="text-gray-700 mb-4">
                Your receipt is ready to generate. Click the buttons below to download in your
                preferred format.
              </p>
              <GenerateButtons
                receiptData={{
                  patient,
                  payment,
                  breakdown,
                  generatedAt: new Date().toISOString(),
                  billingProvider: {
                    name: 'Fountain Vitality',
                  },
                  renderingProvider: {
                    name: 'Duval Medical P.A.',
                    npi: '1234567890',
                  },
                }}
              />
            </div>
            <button
              onClick={() => {
                setStep('upload');
                setPayment(null);
                setPatient({
                  name: '',
                  dateOfBirth: '',
                  coverageStartDate: '',
                  coverageEndDate: '',
                  state: '',
                  medication: [],
                  programType: 'TRT',
                });
                setBreakdown(null);
                setValidationResult(null);
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Start New Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

