# Membership Payment Breakdowns Spreadsheet

Place the `membership-payment-breakdowns.xlsx` file in this directory.

## Expected Format

The spreadsheet should have the following structure:

| Plan Duration | Pharmacy | Lab | Provider | Operational | Discount |
|--------------|----------|-----|----------|-------------|----------|
| 4w           | 100.00   | 50  | 75.00    | 25.00       | 0        |
| 8w           | 200.00   | 100 | 150.00   | 50.00       | 0        |
| 12w          | 300.00   | 150 | 225.00   | 75.00       | 0        |
| 16w          | 400.00   | 200 | 300.00   | 100.00      | 0        |
| 24w          | 600.00   | 300 | 450.00   | 150.00      | 0        |

### Column Descriptions

- **Plan Duration**: Duration in weeks (e.g., "4w", "8w", "12w")
- **Pharmacy**: Pharmacy costs per plan duration
- **Lab**: Laboratory costs per plan duration
- **Provider**: Clinical provider services costs per plan duration
- **Operational**: Operational costs per plan duration
- **Discount**: Optional discount amount (can be 0)

### Notes

- The first row should contain headers
- Plan durations should be in the format "Xw" where X is the number of weeks
- All monetary values should be numeric
- The application will automatically apply state-based exceptions (e.g., NY labs = $0)

