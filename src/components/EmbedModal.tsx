import React from 'react';
import { Copy, X } from 'lucide-react';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  embedCode: string;
}

export const EmbedModal: React.FC<EmbedModalProps> = ({ isOpen, onClose, embedCode }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Embed PDF Viewer</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Copy this code to embed the PDF viewer in your website:
          </p>
          <div className="relative">
            <pre className="bg-gray-50 p-3 rounded-lg text-sm overflow-x-auto">
              {embedCode}
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-md"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Note: The embedded viewer will maintain all page flip functionality.
        </div>
      </div>
    </div>
  );
};