import InstallButton from '../components/InstallButton';

export default function Download() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Download the App</h1>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Install as Progressive Web App (PWA)
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The easiest way to use this app is to install it directly from your browser.
            Once installed, it will work offline and appear like a native app on your device.
          </p>

          <div className="space-y-4 mb-6">
            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Chrome / Edge (Windows, Mac, Linux)</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Visit the app in your browser</li>
                <li>Look for the install icon in the address bar (or click the menu)</li>
                <li>Click &quot;Install&quot; or &quot;Add to Home Screen&quot;</li>
                <li>The app will open in its own window</li>
              </ol>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Safari (iOS / Mac)</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Visit the app in Safari</li>
                <li>Tap the Share button</li>
                <li>Select &quot;Add to Home Screen&quot;</li>
                <li>The app icon will appear on your home screen</li>
              </ol>
            </div>

            <div className="border-l-4 border-primary-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Firefox</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>Visit the app in Firefox</li>
                <li>Click the menu (three lines) in the top right</li>
                <li>Select &quot;Install Site as App&quot;</li>
                <li>The app will be available in your applications</li>
              </ol>
            </div>
          </div>

          <div className="space-y-4">
            <InstallButton />
            <a
              href="/app"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Open App
            </a>
          </div>
          
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> The install prompt may not appear if:
            </p>
            <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
              <li>The app is already installed</li>
              <li>You&apos;re using an unsupported browser</li>
              <li>The site is not served over HTTPS (required for PWA)</li>
              <li>Icons are missing (see instructions below)</li>
            </ul>
            <p className="text-sm text-yellow-700 mt-2">
              If the install button doesn&apos;t appear, use your browser&apos;s menu to install manually.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Download for Local Use
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            You can also download the source code and run it locally on your computer.
            This requires Node.js to be installed.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Prerequisites</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Node.js 18 or higher (<a href="https://nodejs.org" className="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">Download here</a>)</li>
              <li>npm (comes with Node.js)</li>
              <li>Git (optional, for cloning the repository)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Option 1: Clone from GitHub</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
                <div className="mb-2"># Clone the repository</div>
                <div className="mb-2">git clone https://github.com/draphael123/i-temized-receipts.git</div>
                <div className="mb-2">cd i-temized-receipts</div>
                <div className="mb-2"># Install dependencies</div>
                <div className="mb-2">npm install</div>
                <div className="mb-2"># Place your spreadsheet in public/data/membership-payment-breakdowns.xlsx</div>
                <div className="mb-2"># Run the app</div>
                <div>npm run dev</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Option 2: Download ZIP</h3>
              <p className="text-gray-700 mb-3">
                Download the source code as a ZIP file from GitHub:
              </p>
              <a
                href="https://github.com/draphael123/i-temized-receipts/archive/refs/heads/main.zip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                Download ZIP from GitHub
              </a>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <h3 className="font-semibold text-blue-800 mb-2">After Downloading</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
              <li>Extract the ZIP file (if downloaded)</li>
              <li>Open a terminal/command prompt in the project folder</li>
              <li>Run <code className="bg-blue-100 px-1 rounded">npm install</code> to install dependencies</li>
              <li>Place your <code className="bg-blue-100 px-1 rounded">membership-payment-breakdowns.xlsx</code> file in the <code className="bg-blue-100 px-1 rounded">public/data/</code> folder</li>
              <li>Run <code className="bg-blue-100 px-1 rounded">npm run dev</code> to start the development server</li>
              <li>Open <code className="bg-blue-100 px-1 rounded">http://localhost:3000</code> in your browser</li>
            </ol>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Build for Production
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To create a production build that can be deployed or shared:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto">
            <div className="mb-2"># Build the application</div>
            <div className="mb-2">npm run build</div>
            <div className="mb-2"># Start the production server</div>
            <div>npm start</div>
          </div>
          <p className="text-gray-700 text-sm mt-4">
            The production build will be optimized and ready for deployment or local use.
          </p>
        </div>
      </div>
    </div>
  );
}

