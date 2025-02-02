import React from 'react';
import { Loader2 } from 'lucide-react';

interface TextSnippet {
  id: string;
  text: string;
  isHighlighted: boolean;
  status?: 'warning' | 'success' | 'info';
}

interface DocumentViewerProps {
  content: TextSnippet[];
  isLoading?: boolean;
  onSnippetClick: (id: string) => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ content, isLoading, onSnippetClick }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const getHighlightColor = (status?: 'warning' | 'success' | 'info') => {
    switch (status) {
      case 'warning':
        return 'bg-orange-950/50 hover:bg-orange-950/70';
      case 'success':
        return 'bg-green-950/50 hover:bg-green-950/70';
      case 'info':
        return 'bg-blue-950/50 hover:bg-blue-950/70';
      default:
        return 'hover:bg-gray-800';
    }
  };

  return (
    <div className="bg-[#1A1F2C] rounded-lg p-6 min-h-[600px] text-gray-200 animate-fade-in">
      <div className="prose prose-invert max-w-none space-y-4">
        {content.map((snippet) => (
          <div
            key={snippet.id}
            onClick={() => onSnippetClick(snippet.id)}
            className={`cursor-pointer transition-colors ${
              snippet.isHighlighted ? getHighlightColor(snippet.status) : 'hover:bg-gray-800'
            } p-4 rounded-lg`}
          >
            <p className="text-sm leading-relaxed">{snippet.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};