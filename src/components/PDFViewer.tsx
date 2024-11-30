import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import HTMLFlipBook from 'react-pageflip';
import { ChevronLeft, ChevronRight, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { LoadingSpinner } from './LoadingSpinner';
import { EmbedModal } from './EmbedModal';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

const PDFPage: React.FC<{ pageNumber: number; width: number; scale: number }> = React.forwardRef<
  HTMLDivElement,
  { pageNumber: number; width: number; scale: number }
>(({ pageNumber, width, scale }, ref) => {
  const [pageLoading, setPageLoading] = useState(true);

  return (
    <div ref={ref} className="page" style={{ width: `${width}px` }}>
      <div className="page-content">
        {pageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <LoadingSpinner />
          </div>
        )}
        <Page
          pageNumber={pageNumber}
          width={width * 0.9}
          scale={scale}
          renderTextLayer={false}
          onLoadSuccess={() => setPageLoading(false)}
          loading={null}
          className="pdf-page"
        />
      </div>
    </div>
  );
});

export const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bookRef = React.useRef<any>(null);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  // Calculate dimensions based on viewport
  const maxWidth = Math.min(window.innerWidth - 48, 800);
  const pageWidth = maxWidth / 2;
  const pageHeight = pageWidth * 1.4;

  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-50">
            <LoadingSpinner />
          </div>
        )}
        <Document
          file={url}
          onLoadSuccess={handleDocumentLoadSuccess}
          loading={null}
        >
          <HTMLFlipBook
            width={pageWidth}
            height={pageHeight}
            size="stretch"
            minWidth={300}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            showCover={false}
            mobileScrollSupport={true}
            ref={bookRef}
            className="demo-book"
            style={{ background: 'white' }}
          >
            {pages.map((pageNumber) => (
              <PDFPage
                key={pageNumber}
                pageNumber={pageNumber}
                width={pageWidth}
                scale={scale}
              />
            ))}
          </HTMLFlipBook>
        </Document>
      </div>

      <div className="flex justify-between items-center mt-4 px-4 bg-white rounded-lg shadow-md py-2">
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          disabled={isLoading}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setScale(s => Math.max(s - 0.1, 0.5))}
            className="p-2 rounded-full hover:bg-gray-100"
            disabled={isLoading}
            aria-label="Zoom out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-600">
            {isLoading ? 'Loading...' : `Page ${bookRef.current?.pageFlip()?.getCurrentPageIndex() || 1} of ${numPages}`}
          </span>
          <button
            onClick={() => setScale(s => Math.min(s + 0.1, 2))}
            className="p-2 rounded-full hover:bg-gray-100"
            disabled={isLoading}
            aria-label="Zoom in"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            disabled={isLoading}
            aria-label="Share"
          >
            <Share2 className="w-6 h-6" />
          </button>
          <button
            onClick={() => bookRef.current?.pageFlip()?.flipNext()}
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <EmbedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        embedCode={`<iframe src="${window.location.origin}/embed?url=${encodeURIComponent(url)}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`}
      />
    </div>
  );
};