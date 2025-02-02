import React from 'react';
import { Wand2, FileText, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SidebarProps {
  onRewrite: () => void;
  onSimplify: () => void;
  onShowOriginal: () => void;
  isProcessing: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onRewrite,
  onSimplify,
  onShowOriginal,
  isProcessing
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
      <h3 className="font-semibold text-gray-700 mb-4">Document Actions</h3>
      
      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onRewrite}
          disabled={isProcessing}
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Rewrite
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onSimplify}
          disabled={isProcessing}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Simplify
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={onShowOriginal}
          disabled={isProcessing}
        >
          <FileText className="mr-2 h-4 w-4" />
          Show Original
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