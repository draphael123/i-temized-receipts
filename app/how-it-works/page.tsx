export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">How It Works</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Step-by-Step Process
          </h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload Stripe Screenshots
                </h3>
                <p className="text-gray-700 mt-1">
                  Upload PNG or JPG screenshots of your Stripe payment page. The tool uses
                  client-side OCR to extract payment details automatically.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Confirm Payment Details
                </h3>
                <p className="text-gray-700 mt-1">
                  Review the extracted payment amount, charge date, and plan duration.
                  Manually correct any OCR errors if needed.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Enter Patient & Program Details
                </h3>
                <p className="text-gray-700 mt-1">
                  Provide patient information (name, DOB, coverage dates, state) and select
                  the medication(s) and program type.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">4</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Preview the Itemized Breakdown
                </h3>
                <p className="text-gray-700 mt-1">
                  Review the automatically calculated breakdown showing pharmacy costs, lab
                  costs, provider services, operational costs, and discounts. The system
                  validates that totals reconcile with the Stripe charge.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-semibold">5</span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Download the Receipt
                </h3>
                <p className="text-gray-700 mt-1">
                  Generate and download the itemized receipt in DOCX (primary) or PDF format.
                  The receipt matches the official Fountain template structure.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What if OCR makes errors?
              </h3>
              <p className="text-gray-700">
                All OCR-extracted values can be manually corrected in the confirmation step.
                The tool highlights low-confidence extractions for review.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How are plan mismatches handled?
              </h3>
              <p className="text-gray-700">
                If the detected plan duration doesn&apos;t match expected values, the system will
                flag it for manual review. You can override the plan selection if needed.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are state-based exceptions applied automatically?
              </h3>
              <p className="text-gray-700">
                Yes. For example, if a patient is in New York, lab costs are automatically
                set to $0, and the remaining costs are reallocated to maintain the total
                charge amount.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How is the breakdown calculated?
              </h3>
              <p className="text-gray-700 mb-3">
                The tool uses the Membership Payment Breakdowns spreadsheet as the source
                of truth. It applies standardized rules based on plan duration, program type,
                medication selection, and patient state to calculate each line item.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-3">
                <p className="text-sm text-blue-800 font-semibold mb-2">All Costs Included:</p>
                <p className="text-sm text-blue-700">
                  The breakdown includes <strong>all costs</strong> from the spreadsheet, not just medications.
                  This includes:
                </p>
                <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
                  <li>Pharmacy costs (medications)</li>
                  <li>Lab costs (laboratory services)</li>
                  <li>Provider services (clinical services)</li>
                  <li>Operational costs</li>
                  <li>Support services</li>
                  <li>Shipping & handling</li>
                  <li>Any other cost categories in the spreadsheet</li>
                </ul>
                <p className="text-sm text-blue-700 mt-2">
                  The system automatically reads all columns from the spreadsheet and creates
                  line items for each cost category. Pharmacy costs are multiplied by the
                  number of medications selected.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my data stored?
              </h3>
              <p className="text-gray-700">
                All processing happens locally in your browser. Screenshots are never uploaded.
                You can optionally enable local storage to save a history of generated receipts
                for your convenience, but this is entirely optional and stored only on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

