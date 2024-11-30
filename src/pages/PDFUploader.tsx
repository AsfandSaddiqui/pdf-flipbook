import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { PDFViewer } from '../components/PDFViewer';

export const PDFUploader: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  }, []);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  }, []);

  if (pdfUrl) {
    return <PDFViewer url={pdfUrl} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Upload your PDF
          </h2>
          <p className="text-gray-600">
            Drag and drop your PDF file here, or click to select
          </p>
        </div>

        <label className="relative">
          <input
            type="file"
            accept="application/pdf"
            onChange={onFileSelect}
            className="hidden"
          />
          <div className="cursor-pointer py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block">
            Select PDF File
          </div>
        </label>
      </div>
    </div>
  );
};