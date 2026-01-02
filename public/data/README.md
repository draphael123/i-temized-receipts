# Membership Payment Breakdowns Spreadsheet

Place the `membership-payment-breakdowns.xlsx` file in this directory.

## Expected Format

The spreadsheet should have the following structure. **All columns** in the spreadsheet will be included in the breakdown:

| Plan Duration | Pharmacy | Lab | Provider | Operational | Support | Shipping | Discount |
|--------------|----------|-----|----------|-------------|---------|----------|----------|
| 4w           | 100.00   | 50  | 75.00    | 25.00       | 15.00   | 10.00    | 0        |
| 8w           | 200.00   | 100 | 150.00   | 50.00       | 30.00   | 20.00    | 0        |
| 12w          | 300.00   | 150 | 225.00   | 75.00       | 45.00   | 30.00    | 0        |
| 16w          | 400.00   | 200 | 300.00   | 100.00      | 60.00   | 40.00    | 0        |
| 24w          | 600.00   | 300 | 450.00   | 150.00      | 90.00   | 60.00    | 0        |

### Column Descriptions

- **Plan Duration**: Duration in weeks (e.g., "4w", "8w", "12w") - **Required first column**
- **Pharmacy**: Pharmacy costs per plan duration (multiplied by number of medications)
- **Lab**: Laboratory costs per plan duration (set to $0 for NY patients)
- **Provider**: Clinical provider services costs per plan duration
- **Operational**: Operational costs per plan duration
- **Support**: Support services costs (or any other category name)
- **Shipping**: Shipping & handling costs (or any other category name)
- **Discount**: Optional discount amount (can be 0, shown as negative value)

### Important Notes

- **All columns** in the spreadsheet (except Plan Duration) will be included in the breakdown
- Column names are case-insensitive and will be automatically formatted for display
- You can add any additional cost categories (e.g., "Support", "Shipping", "Consultation", etc.)
- The system will create separate line items for each cost category
- Pharmacy costs are automatically multiplied by the number of medications selected

### Notes

- The first row should contain headers
- Plan durations should be in the format "Xw" where X is the number of weeks
- All monetary values should be numeric
- The application will automatically apply state-based exceptions (e.g., NY labs = $0)

