import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { LoadingSpinner } from "./LoadingSpinner";
import { EmbedModal } from "./EmbedModal";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url: string;
}

const PDFPage: React.FC<{ pageNumber: number; width: number }> =
  React.forwardRef<HTMLDivElement, { pageNumber: number; width: number }>(
    ({ pageNumber, width }, ref) => {
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
              scale={1}
              renderTextLayer={false}
              onLoadSuccess={() => setPageLoading(false)}
              loading={null}
              className="pdf-page"
            />
          </div>
        </div>
      );
    }
  );

export const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0);
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
  const isSmallScreen = window.innerWidth <= 425;

  const pages = Array.from({ length: numPages }, (_, i) => i + 1);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-50">
          <LoadingSpinner />
        </div>
      )}
      <div
        style={{ width:`${pageWidth * 2}px` }}
      >
        <div className="w-full">
          <Document
            file={url}
            onLoadSuccess={handleDocumentLoadSuccess}
            loading={null}
          >
            <HTMLFlipBook
              width={pageWidth}
              height={pageHeight}
              minWidth={300}
              maxWidth={1000}
              minHeight={400}
              maxHeight={1533}
              showCover={false}
              mobileScrollSupport={true}
              ref={bookRef}
              className="demo-book"
              style={{ background: "white" }}
              flippingTime={isSmallScreen ? 3000 : 1000}
            >
              {pages.map((pageNumber) => (
                <PDFPage
                  key={pageNumber}
                  pageNumber={pageNumber}
                  width={pageWidth}
                />
              ))}
            </HTMLFlipBook>
          </Document>

          <EmbedModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            embedCode={`<iframe src="${
              window.location.origin
            }/embed?url=${encodeURIComponent(
              url
            )}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`}
          />
        </div>
      </div>
    </div>
  );
};
