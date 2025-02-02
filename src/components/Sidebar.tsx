import React from 'react';
import { Wand2, FileText, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SidebarProps {
  onRewrite: (snippetId: string | null) => void;
  onSimplify: (snippetId: string | null) => void;
  onShowOriginal: (snippetId: string | null) => void;
  isProcessing: boolean;
  selectedSnippetId: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onRewrite,
  onSimplify,
  onShowOriginal,
  isProcessing,
  selectedSnippetId
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector('.prose')?.textContent || '');
      toast.success('Content copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy content');
    }
  };

  return (
    <div className="w-64 border-l border-gray-200 p-4 space-y-4">
      <h3 className="font-semibold text-gray-700 mb-4">
        {selectedSnippetId ? 'Snippet Actions' : 'Document Actions'}
      </h3>
      
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => onRewrite(selectedSnippetId)}
          disabled={isProcessing}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Rewrite {selectedSnippetId ? 'Snippet' : 'All'}
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => onSimplify(selectedSnippetId)}
          disabled={isProcessing}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Simplify {selectedSnippetId ? 'Snippet' : 'All'}
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => onShowOriginal(selectedSnippetId)}
          disabled={isProcessing}
        >
          <FileText className="mr-2 h-4 w-4" />
          Show Original {selectedSnippetId ? 'Snippet' : 'All'}
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleCopy}
          disabled={isProcessing}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Content
        </Button>
      </div>
    </div>
  );
};