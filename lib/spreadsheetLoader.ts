import * as XLSX from 'xlsx';
import type { SpreadsheetData } from './types';

export async function loadSpreadsheetFromFile(file: File): Promise<SpreadsheetData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          reject(new Error('Failed to read file'));
          return;
        }

        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const spreadsheetData: SpreadsheetData = {};
        
        // Get headers from first row (skip if empty)
        const headers = (jsonData[0] as unknown[]) || [];
        const planDurationIndex = 0; // First column is always plan duration
        
        // Parse the spreadsheet - dynamically read all columns
        // Format: [Plan Duration, Category1, Category2, Category3, ...]
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i] as unknown[];
          if (row.length > 0) {
            const key = String(row[planDurationIndex] || '').trim();
            if (key) {
              const costs: { [category: string]: number } = {};
              
              // Read all cost columns (skip the plan duration column)
              for (let j = 1; j < headers.length && j < row.length; j++) {
                const categoryName = String(headers[j] || '').trim().toLowerCase();
                if (categoryName) {
                  const value = parseFloat(String(row[j] || 0)) || 0;
                  if (value !== 0 || categoryName === 'discount') {
                    // Include all non-zero values, and discount even if 0
                    costs[categoryName] = value;
                  }
                }
              }
              
              spreadsheetData[key] = costs;
            }
          }
        }

        resolve(spreadsheetData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsBinaryString(file);
  });
}

export async function loadSpreadsheetFromPublic(): Promise<SpreadsheetData> {
  try {
    const response = await fetch('/data/membership-payment-breakdowns.xlsx');
    if (!response.ok) {
      throw new Error('Failed to load spreadsheet from public folder');
    }
    const blob = await response.blob();
    const file = new File([blob], 'membership-payment-breakdowns.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    return loadSpreadsheetFromFile(file);
  } catch (error) {
    console.error('Failed to load spreadsheet from public folder:', error);
    throw error;
  }
}

