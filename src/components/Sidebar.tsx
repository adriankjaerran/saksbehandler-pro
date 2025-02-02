import React from 'react';
import { Wand2, FileText, Copy, RefreshCw, AlertCircle, CheckCircle2, Info } from 'lucide-react';
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
    <div className="w-80 bg-[#1E2433] p-6 rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Review</h3>
        <span className="text-sm text-gray-400">AI Associate</span>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1A1F2C] rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <h4 className="text-white font-medium">Non-solicitation terms assessment</h4>
              <p className="text-sm text-gray-400 mt-1">
                The Joint Venture Agreement does not explicitly mention non-solicitation terms.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onRewrite(selectedSnippetId)}
            >
              Highlight
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onSimplify(selectedSnippetId)}
            >
              Explain
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onShowOriginal(selectedSnippetId)}
            >
              Re-draft
            </Button>
          </div>
        </div>

        <div className="bg-[#1A1F2C] rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <h4 className="text-white font-medium">Equitable Profit and Loss Distribution Formula</h4>
              <p className="text-sm text-gray-400 mt-1">
                This formula ensures that profits and losses are distributed based on the actual contribution of each party.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onRewrite(selectedSnippetId)}
            >
              Highlight
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onSimplify(selectedSnippetId)}
            >
              Explain
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onShowOriginal(selectedSnippetId)}
            >
              Re-draft
            </Button>
          </div>
        </div>

        <div className="bg-[#1A1F2C] rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-orange-400 mt-1" />
            <div>
              <h4 className="text-white font-medium">Lack of Explicit Mutual Objectives Balance</h4>
              <p className="text-sm text-gray-400 mt-1">
                While the agreement specifies percentage ownership and responsibilities, it lacks clear alignment of goals.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onRewrite(selectedSnippetId)}
            >
              Highlight
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onSimplify(selectedSnippetId)}
            >
              Explain
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onShowOriginal(selectedSnippetId)}
            >
              Re-draft
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-800">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleCopy}
          disabled={isProcessing}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy All Content
        </Button>
      </div>
    </div>
  );
};