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
        
        // Parse the spreadsheet - adjust based on actual structure
        // Assuming format: [Plan Duration, Pharmacy, Lab, Provider, Operational, Discount]
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i] as unknown[];
          if (row.length >= 5) {
            const key = String(row[0] || '').trim();
            if (key) {
              spreadsheetData[key] = {
                pharmacy: parseFloat(String(row[1] || 0)) || 0,
                lab: parseFloat(String(row[2] || 0)) || 0,
                provider: parseFloat(String(row[3] || 0)) || 0,
                operational: parseFloat(String(row[4] || 0)) || 0,
                discount: row[5] ? parseFloat(String(row[5])) : undefined,
              };
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

