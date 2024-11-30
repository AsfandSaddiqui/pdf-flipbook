import React from 'react';
import { PDFViewer } from './components/PDFViewer';
import { AlertCircle } from 'lucide-react';

function App() {
  const params = new URLSearchParams(window.location.search);
  const pdfUrl = params.get('url');

  if (!pdfUrl) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center gap-3 text-gray-800">
            <AlertCircle className="w-6 h-6 flex-shrink-0 text-blue-500" />
            <div>
              <h3 className="font-semibold text-lg">No PDF URL Provided</h3>
              <p className="text-sm text-gray-600 mt-1">
                Please provide a PDF URL in the query parameters.<br />
                Example: <code className="bg-gray-100 px-2 py-1 rounded">?url=https://example.com/sample.pdf</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  try {
    new URL(pdfUrl); // Validate URL
    return <PDFViewer url={pdfUrl} />;
  } catch {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-lg">Invalid PDF URL</h3>
              <p className="text-sm text-gray-600 mt-1">
                The provided URL is not valid. Please check the URL and try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;