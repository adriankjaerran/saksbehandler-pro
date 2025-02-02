import React from 'react';
import { Loader2 } from 'lucide-react';

interface DocumentViewerProps {
  content: string;
  isLoading?: boolean;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ content, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 min-h-[300px] animate-fade-in">
      <div className="prose max-w-none">
        {content || "No content to display"}
      </div>
    </div>
  );
};