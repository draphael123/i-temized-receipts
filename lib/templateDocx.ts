import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  AlignmentType,
  HeadingLevel,
} from 'docx';
import type { ReceiptData } from './types';

export async function generateDocx(receipt: ReceiptData): Promise<Blob> {
  const { patient, payment, breakdown, billingProvider, renderingProvider } = receipt;

  const children: (Paragraph | Table)[] = [];

  // Header
  children.push(
    new Paragraph({
      text: 'ITEMIZED RECEIPT',
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  // Patient Information
  children.push(
    new Paragraph({
      text: 'Patient Information',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 200 },
    })
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Name: ${patient.name}`, break: 1 }),
        new TextRun({ text: `Date of Birth: ${patient.dateOfBirth}`, break: 1 }),
        new TextRun({ text: `Coverage Period: ${patient.coverageStartDate} to ${patient.coverageEndDate}`, break: 1 }),
        new TextRun({ text: `State: ${patient.state}`, break: 1 }),
        new TextRun({ text: `Program Type: ${patient.programType}`, break: 1 }),
        new TextRun({ text: `Medication: ${patient.medication.join(', ')}`, break: 1 }),
      ],
      spacing: { after: 400 },
    })
  );

  // Payment Information
  children.push(
    new Paragraph({
      text: 'Payment Information',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 200 },
    })
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Charge Date: ${payment.chargeDate}`, break: 1 }),
        new TextRun({ text: `Plan Duration: ${payment.planDuration} weeks`, break: 1 }),
      ],
      spacing: { after: 400 },
    })
  );

  // Provider Information (if available)
  if (billingProvider || renderingProvider) {
    children.push(
      new Paragraph({
        text: 'Provider Information',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 200 },
      })
    );

    if (billingProvider) {
      children.push(
        new Paragraph({
          text: `Billing Provider: ${billingProvider.name}${billingProvider.npi ? ` (NPI: ${billingProvider.npi})` : ''}`,
          spacing: { after: 200 },
        })
      );
    }

    if (renderingProvider) {
      children.push(
        new Paragraph({
          text: `Rendering Provider: ${renderingProvider.name} (NPI: ${renderingProvider.npi})`,
          spacing: { after: 400 },
        })
      );
    }
  }

  // Breakdown Table
  children.push(
    new Paragraph({
      text: 'Itemized Breakdown',
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 200 },
    })
  );

  const tableRows: TableRow[] = [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('Description')],
          width: { size: 60, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
          children: [new Paragraph('Quantity')],
          width: { size: 15, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
          children: [new Paragraph('Unit Price')],
          width: { size: 15, type: WidthType.PERCENTAGE },
        }),
        new TableCell({
          children: [new Paragraph('Total')],
          width: { size: 15, type: WidthType.PERCENTAGE },
        }),
      ],
    }),
  ];

  // Pharmacy Costs
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: breakdown.pharmacy.name, heading: HeadingLevel.HEADING_2 })],
          columnSpan: 4,
        }),
      ],
    })
  );

  breakdown.pharmacy.lineItems.forEach((item) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(item.description)],
          }),
          new TableCell({
            children: [new Paragraph(item.quantity?.toString() || '-')],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.unitPrice.toFixed(2)}`)],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.total.toFixed(2)}`)],
          }),
        ],
      })
    );
  });

  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: 'Subtotal', bold: true })],
            }),
          ],
          columnSpan: 3,
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [new TextRun({ text: `$${breakdown.pharmacy.subtotal.toFixed(2)}`, bold: true })],
            }),
          ],
        }),
      ],
    })
  );

  // Lab Costs
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: breakdown.lab.name, heading: HeadingLevel.HEADING_2 })],
          columnSpan: 4,
        }),
      ],
    })
  );

  breakdown.lab.lineItems.forEach((item) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(item.description)],
          }),
          new TableCell({
            children: [new Paragraph('-')],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.unitPrice.toFixed(2)}`)],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.total.toFixed(2)}`)],
          }),
        ],
      })
    );
  });

  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Subtotal', bold: true })] })],
          columnSpan: 3,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `$${breakdown.lab.subtotal.toFixed(2)}`, bold: true })] })],
        }),
      ],
    })
  );

  // Provider Services
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: breakdown.provider.name, heading: HeadingLevel.HEADING_2 })],
          columnSpan: 4,
        }),
      ],
    })
  );

  breakdown.provider.lineItems.forEach((item) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(item.description)],
          }),
          new TableCell({
            children: [new Paragraph('-')],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.unitPrice.toFixed(2)}`)],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.total.toFixed(2)}`)],
          }),
        ],
      })
    );
  });

  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Subtotal', bold: true })] })],
          columnSpan: 3,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `$${breakdown.provider.subtotal.toFixed(2)}`, bold: true })] })],
        }),
      ],
    })
  );

  // Operational Costs
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ text: breakdown.operational.name, heading: HeadingLevel.HEADING_2 })],
          columnSpan: 4,
        }),
      ],
    })
  );

  breakdown.operational.lineItems.forEach((item) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(item.description)],
          }),
          new TableCell({
            children: [new Paragraph('-')],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.unitPrice.toFixed(2)}`)],
          }),
          new TableCell({
            children: [new Paragraph(`$${item.total.toFixed(2)}`)],
          }),
        ],
      })
    );
  });

  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'Subtotal', bold: true })] })],
          columnSpan: 3,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `$${breakdown.operational.subtotal.toFixed(2)}`, bold: true })] })],
        }),
      ],
    })
  );

  // Discounts (if applicable)
  if (breakdown.discounts) {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ text: breakdown.discounts.name, heading: HeadingLevel.HEADING_2 })],
            columnSpan: 4,
          }),
        ],
      })
    );

    breakdown.discounts.lineItems.forEach((item) => {
      tableRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(item.description)],
            }),
            new TableCell({
              children: [new Paragraph('-')],
            }),
            new TableCell({
              children: [new Paragraph(`$${item.unitPrice.toFixed(2)}`)],
            }),
            new TableCell({
              children: [new Paragraph(`$${item.total.toFixed(2)}`)],
            }),
          ],
        })
      );
    });

    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: 'Subtotal', bold: true })] })],
            columnSpan: 3,
          }),
          new TableCell({
            children: [new Paragraph({ children: [new TextRun({ text: `$${breakdown.discounts.subtotal.toFixed(2)}`, bold: true })] })],
          }),
        ],
      })
    );
  }

  // Total
  tableRows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: 'TOTAL COST', bold: true })] })],
          columnSpan: 3,
        }),
        new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: `$${breakdown.total.toFixed(2)}`, bold: true })] })],
        }),
      ],
    })
  );

  children.push(
    new Table({
      rows: tableRows,
      width: { size: 100, type: WidthType.PERCENTAGE },
    })
  );

  // Exceptions (if any)
  if (breakdown.exceptions.length > 0) {
    children.push(
      new Paragraph({
        text: 'Notes',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 200 },
      })
    );

    breakdown.exceptions.forEach((exception) => {
      children.push(
        new Paragraph({
          text: `• ${exception.message}`,
          spacing: { after: 100 },
        })
      );
    });
  }

  // Footer
  children.push(
    new Paragraph({
      text: `Generated on ${new Date(receipt.generatedAt).toLocaleString()}`,
      alignment: AlignmentType.CENTER,
      spacing: { before: 400 },
    })
  );

  const doc = new Document({
    sections: [
      {
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  return blob;
}

