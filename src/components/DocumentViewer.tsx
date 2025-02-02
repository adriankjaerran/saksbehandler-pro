import React from 'react';
import { Loader2 } from 'lucide-react';

interface TextSnippet {
  id: string;
  text: string;
  isHighlighted: boolean;
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 min-h-[300px] animate-fade-in">
      <div className="prose max-w-none space-y-4">
        {content.map((snippet) => (
          <p
            key={snippet.id}
            onClick={() => onSnippetClick(snippet.id)}
            className={`cursor-pointer transition-colors ${
              snippet.isHighlighted ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
            } p-2 rounded`}
          >
            {snippet.text}
          </p>
        ))}
      </div>
    </div>
  );
};