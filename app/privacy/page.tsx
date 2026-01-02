export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy & Security</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Local Processing Only
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This application is designed with privacy and security as top priorities. All
            processing occurs entirely within your web browser—no data is transmitted to
            external servers.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            What Runs Locally
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>OCR Processing:</strong> Screenshot analysis using tesseract.js runs
                entirely in your browser using WebAssembly.
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Spreadsheet Lookup:</strong> The Membership Payment Breakdowns
                spreadsheet is loaded and parsed locally using SheetJS (xlsx).
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Document Generation:</strong> DOCX and PDF files are created
                client-side and downloaded directly to your device.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Optional Local History
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You can optionally enable local storage to save a history of generated receipts
            in your browser's IndexedDB. This includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>OCR-extracted text</li>
            <li>Parsed Stripe payment values</li>
            <li>User-entered patient data</li>
            <li>Applied breakdown calculations</li>
            <li>Exception flags and audit logs</li>
            <li>Generated file metadata</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            <strong>Important:</strong> Screenshots are never stored unless you explicitly
            enable this feature. All stored data remains on your device and is never
            transmitted to any server.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No Server-Side Data Retention
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This application has no backend APIs. There is no server-side data retention,
            no cloud storage, and no external data transmission. When you close your browser,
            all temporary processing data is cleared unless you've explicitly enabled local
            storage.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                HIPAA & PHI Considerations
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                Since all processing occurs locally and no data is transmitted externally,
                this tool is designed to minimize PHI exposure. However, you should still
                follow your organization's policies regarding patient data handling and
                ensure screenshots are handled appropriately on your device.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

