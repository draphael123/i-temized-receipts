'use client';

import { useState } from 'react';
import type { PatientDetails } from '@/lib/types';

interface PatientDetailsFormProps {
  data: PatientDetails;
  onUpdate: (data: Partial<PatientDetails>) => void;
}

const STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
];

const MEDICATIONS = [
  'Testosterone',
  'Estradiol',
  'Progesterone',
  'Other',
];

export default function PatientDetailsForm({
  data,
  onUpdate,
}: PatientDetailsFormProps) {
  const [newMedication, setNewMedication] = useState('');

  const addMedication = () => {
    if (newMedication.trim() && !data.medication.includes(newMedication.trim())) {
      onUpdate({ medication: [...data.medication, newMedication.trim()] });
      setNewMedication('');
    }
  };

  const removeMedication = (med: string) => {
    onUpdate({ medication: data.medication.filter((m) => m !== med) });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Details</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Patient Name *
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => onUpdate({ dateOfBirth: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coverage Start Date *
            </label>
            <input
              type="date"
              value={data.coverageStartDate}
              onChange={(e) => onUpdate({ coverageStartDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coverage End Date *
            </label>
            <input
              type="date"
              value={data.coverageEndDate}
              onChange={(e) => onUpdate({ coverageEndDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <select
            value={data.state}
            onChange={(e) => onUpdate({ state: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="">Select a state</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Program Type *
          </label>
          <select
            value={data.programType}
            onChange={(e) =>
              onUpdate({ programType: e.target.value as PatientDetails['programType'] })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          >
            <option value="TRT">TRT</option>
            <option value="HRT">HRT</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medication(s) *
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMedication())}
              placeholder="Enter medication name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="button"
              onClick={addMedication}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add
            </button>
          </div>
          {data.medication.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.medication.map((med) => (
                <span
                  key={med}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                >
                  {med}
                  <button
                    type="button"
                    onClick={() => removeMedication(med)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

