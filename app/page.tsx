import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Itemized Receipt Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Convert Stripe membership payments into Fountain-approved itemized receipts.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Rationale
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This tool converts a membership payment into an itemized receipt by applying
            Fountain&apos;s standardized cost breakdown rules. It ensures receipts are consistent,
            auditable, and aligned with the official template.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            By automating the breakdown process, we eliminate manual calculation errors and
            ensure every receipt follows the same business logic, making them easier to audit
            and compliant with billing requirements.
          </p>
          <div className="bg-primary-50 border border-primary-200 rounded-md p-4">
            <p className="text-sm text-primary-800 font-semibold mb-2">Comprehensive Cost Breakdown:</p>
            <p className="text-sm text-primary-700">
              The system calculates <strong>all costs</strong> from the Membership Payment Breakdowns
              spreadsheet, including medications, lab services, provider services, operational costs,
              support services, shipping, and any other categories defined in the spreadsheet.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Privacy Notice</h3>
              <p className="mt-1 text-sm text-blue-700">
                All processing occurs locally in your browser. Stripe screenshots are not uploaded.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/app"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Generate a Receipt
          </Link>
          <Link
            href="/download"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Download App
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}

