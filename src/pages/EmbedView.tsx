import React from 'react';
import { PDFViewer } from '../components/PDFViewer';
import { AlertCircle } from 'lucide-react';

export const EmbedView: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const pdfUrl = params.get('url');

  if (!pdfUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 rounded-lg p-4 flex items-center gap-3 text-red-600">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Error</h3>
            <p className="text-sm">No PDF URL provided in the embed parameters</p>
          </div>
        </div>
      </div>
    );
  }

  try {
    // Validate URL
    new URL(pdfUrl);
    return (
      <div className="h-screen w-full overflow-hidden">
        <PDFViewer url={pdfUrl} isEmbed={true} />
      </div>
    );
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 rounded-lg p-4 flex items-center gap-3 text-red-600">
          <AlertCircle className="w-6 h-6 flex-shrink-0" />
          <div>
            <h3 className="font-semibold">Error</h3>
            <p className="text-sm">Invalid PDF URL provided</p>
          </div>
        </div>
      </div>
    );
  }
};