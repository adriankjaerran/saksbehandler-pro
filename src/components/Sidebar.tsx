import React from 'react';
import { Wand2, FileText, Copy, RefreshCw, AlertCircle, CheckCircle2, Info, ArrowRight } from 'lucide-react';
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
      toast.success('Innhold kopiert til utklippstavlen');
    } catch (err) {
      toast.error('Kunne ikke kopiere innhold');
    }
  };

  return (
    <div className="w-80 bg-[#1E2433] p-6 rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Gjennomgang</h3>
        <span className="text-sm text-gray-400">AI Assistent</span>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1A1F2C] rounded-lg p-4 space-y-3 relative group">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <h4 className="text-white font-medium">Medisinske Funn</h4>
              <p className="text-sm text-gray-400 mt-1">
                MR-undersøkelsen bekrefter alvorlig kneskade som krever operativ behandling.
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
              Marker
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onSimplify(selectedSnippetId)}
            >
              Forklar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onShowOriginal(selectedSnippetId)}
            >
              Omskriv
            </Button>
          </div>
        </div>

        <div className="bg-[#1A1F2C] rounded-lg p-4 space-y-3 relative group">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-green-400" />
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400 mt-1" />
            <div>
              <h4 className="text-white font-medium">NAV Vedtak</h4>
              <p className="text-sm text-gray-400 mt-1">
                Positivt vedtak om arbeidsavklaringspenger basert på dokumentert yrkesskade.
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
              Marker
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onSimplify(selectedSnippetId)}
            >
              Forklar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onShowOriginal(selectedSnippetId)}
            >
              Omskriv
            </Button>
          </div>
        </div>

        <div className="bg-[#1A1F2C] rounded-lg p-4 space-y-3 relative group">
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-orange-400 mt-1" />
            <div>
              <h4 className="text-white font-medium">Spesialistvurdering</h4>
              <p className="text-sm text-gray-400 mt-1">
                Vurdering indikerer langvarig rehabiliteringsperiode som påvirker arbeidsevnen betydelig.
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
              Marker
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onSimplify(selectedSnippetId)}
            >
              Forklar
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => onShowOriginal(selectedSnippetId)}
            >
              Omskriv
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
          Kopier Alt Innhold
        </Button>
      </div>
    </div>
  );
};