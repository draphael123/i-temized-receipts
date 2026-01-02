import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { ReceiptData } from './types';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
    flex: 1,
  },
  tableCellDescription: {
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
    flex: 3,
  },
  totalRow: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
  },
});

export function generatePdfDocument(receipt: ReceiptData) {
  const { patient, payment, breakdown, billingProvider, renderingProvider } = receipt;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>ITEMIZED RECEIPT</Text>

        <View style={styles.section}>
          <Text style={styles.heading}>Patient Information</Text>
          <Text>Name: {patient.name}</Text>
          <Text>Date of Birth: {patient.dateOfBirth}</Text>
          <Text>
            Coverage Period: {patient.coverageStartDate} to {patient.coverageEndDate}
          </Text>
          <Text>State: {patient.state}</Text>
          <Text>Program Type: {patient.programType}</Text>
          <Text>Medication: {patient.medication.join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Payment Information</Text>
          <Text>Charge Date: {payment.chargeDate}</Text>
          <Text>Plan Duration: {payment.planDuration} weeks</Text>
        </View>

        {(billingProvider || renderingProvider) && (
          <View style={styles.section}>
            <Text style={styles.heading}>Provider Information</Text>
            {billingProvider && (
              <Text>
                Billing Provider: {billingProvider.name}
                {billingProvider.npi ? ` (NPI: ${billingProvider.npi})` : ''}
              </Text>
            )}
            {renderingProvider && (
              <Text>
                Rendering Provider: {renderingProvider.name} (NPI: {renderingProvider.npi})
              </Text>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.heading}>Itemized Breakdown</Text>

          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCellDescription}>Description</Text>
              <Text style={styles.tableCell}>Qty</Text>
              <Text style={styles.tableCell}>Unit Price</Text>
              <Text style={styles.tableCell}>Total</Text>
            </View>

            {/* Pharmacy */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCellDescription, { fontWeight: 'bold' }]}>
                {breakdown.pharmacy.name}
              </Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
            {breakdown.pharmacy.lineItems.map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.tableCellDescription}>{item.description}</Text>
                <Text style={styles.tableCell}>{item.quantity || '-'}</Text>
                <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
                <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
              </View>
            ))}
            <View style={[styles.tableRow, styles.totalRow]}>
              <Text style={[styles.tableCellDescription, { flex: 3 }]}>Subtotal</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}>${breakdown.pharmacy.subtotal.toFixed(2)}</Text>
            </View>

            {/* Lab */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCellDescription, { fontWeight: 'bold' }]}>
                {breakdown.lab.name}
              </Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
            {breakdown.lab.lineItems.map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.tableCellDescription}>{item.description}</Text>
                <Text style={styles.tableCell}>-</Text>
                <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
                <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
              </View>
            ))}
            <View style={[styles.tableRow, styles.totalRow]}>
              <Text style={[styles.tableCellDescription, { flex: 3 }]}>Subtotal</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}>${breakdown.lab.subtotal.toFixed(2)}</Text>
            </View>

            {/* Provider */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCellDescription, { fontWeight: 'bold' }]}>
                {breakdown.provider.name}
              </Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
            {breakdown.provider.lineItems.map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.tableCellDescription}>{item.description}</Text>
                <Text style={styles.tableCell}>-</Text>
                <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
                <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
              </View>
            ))}
            <View style={[styles.tableRow, styles.totalRow]}>
              <Text style={[styles.tableCellDescription, { flex: 3 }]}>Subtotal</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}>${breakdown.provider.subtotal.toFixed(2)}</Text>
            </View>

            {/* Operational */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCellDescription, { fontWeight: 'bold' }]}>
                {breakdown.operational.name}
              </Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
            </View>
            {breakdown.operational.lineItems.map((item, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.tableCellDescription}>{item.description}</Text>
                <Text style={styles.tableCell}>-</Text>
                <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
                <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
              </View>
            ))}
            <View style={[styles.tableRow, styles.totalRow]}>
              <Text style={[styles.tableCellDescription, { flex: 3 }]}>Subtotal</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}>${breakdown.operational.subtotal.toFixed(2)}</Text>
            </View>

            {/* Discounts */}
            {breakdown.discounts && (
              <>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCellDescription, { fontWeight: 'bold' }]}>
                    {breakdown.discounts.name}
                  </Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}></Text>
                </View>
                {breakdown.discounts.lineItems.map((item, idx) => (
                  <View key={idx} style={styles.tableRow}>
                    <Text style={styles.tableCellDescription}>{item.description}</Text>
                    <Text style={styles.tableCell}>-</Text>
                    <Text style={styles.tableCell}>${item.unitPrice.toFixed(2)}</Text>
                    <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
                  </View>
                ))}
                <View style={[styles.tableRow, styles.totalRow]}>
                  <Text style={[styles.tableCellDescription, { flex: 3 }]}>Subtotal</Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}></Text>
                  <Text style={styles.tableCell}>${breakdown.discounts.subtotal.toFixed(2)}</Text>
                </View>
              </>
            )}

            {/* Total */}
            <View style={[styles.tableRow, styles.totalRow]}>
              <Text style={[styles.tableCellDescription, { flex: 3, fontSize: 12 }]}>
                TOTAL COST
              </Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              <Text style={[styles.tableCell, { fontSize: 12 }]}>
                ${breakdown.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {breakdown.exceptions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Notes</Text>
            {breakdown.exceptions.map((exception, idx) => (
              <Text key={idx}>• {exception.message}</Text>
            ))}
          </View>
        )}

        <Text style={styles.footer}>
          Generated on {new Date(receipt.generatedAt).toLocaleString()}
        </Text>
      </Page>
    </Document>
  );
}

