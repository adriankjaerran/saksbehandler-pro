import React, { useState } from 'react';
import { DocumentViewer } from '@/components/DocumentViewer';
import { Sidebar } from '@/components/Sidebar';
import { Navigation } from '@/components/Navigation';
import { toast } from 'sonner';

interface TextSnippet {
  id: string;
  text: string;
  isHighlighted: boolean;
  status?: 'warning' | 'success' | 'info';
  title?: string;
  description?: string;
}

const dummySnippets: TextSnippet[] = [
  {
    id: '1',
    text: 'MR-undersøkelse av høyre kne utført 15.03.2024: Undersøkelsen viser en komplett ruptur av fremre korsbånd (ACL) med assosiert beinmargsødem i laterale femurkondyl og laterale tibiaplatå. Det ses også en grad II skade av det mediale kollateralligamentet.',
    isHighlighted: false,
    status: 'info',
    title: 'Medisinske Funn',
    description: 'MR-undersøkelsen bekrefter alvorlig kneskade som krever operativ behandling.'
  },
  {
    id: '2',
    text: 'Vedtak fra NAV Arbeid og Ytelser datert 01.04.2024: Basert på dokumentert skade under arbeidstid 10.03.2024 og påfølgende medisinsk vurdering, innvilges søker rett til arbeidsavklaringspenger i henhold til folketrygdloven § 11-5. Vedtaket gjelder fra 15.03.2024 til 15.09.2024.',
    isHighlighted: false,
    status: 'success',
    title: 'NAV Vedtak',
    description: 'Positivt vedtak om arbeidsavklaringspenger basert på dokumentert yrkesskade.'
  },
  {
    id: '3',
    text: 'Spesialistvurdering fra Oslo Universitetssykehus 20.03.2024: Pasienten har betydelig redusert arbeidsevne grunnet skaden. Operasjon er planlagt 05.04.2024, med forventet rehabiliteringsperiode på 6-8 måneder. Pasienten vil ikke kunne returnere til sitt vanlige arbeid som bygningsarbeider i denne perioden.',
    isHighlighted: false,
    status: 'warning',
    title: 'Spesialistvurdering',
    description: 'Vurdering indikerer langvarig rehabiliteringsperiode som påvirker arbeidsevnen betydelig.'
  }
];

const Saksdokument = () => {
  const [content, setContent] = useState<TextSnippet[]>(dummySnippets);
  const [originalContent, setOriginalContent] = useState<TextSnippet[]>(dummySnippets);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);

  const handleSnippetClick = (id: string) => {
    setSelectedSnippetId(id === selectedSnippetId ? null : id);
    setContent(prevContent =>
      prevContent.map(snippet => ({
        ...snippet,
        isHighlighted: snippet.id === id && id !== selectedSnippetId
      }))
    );
  };

  const handleRewrite = (snippetId: string | null) => {
    setIsProcessing(true);
    setTimeout(() => {
      setContent(prevContent =>
        prevContent.map(snippet => {
          if (!snippetId || snippet.id === snippetId) {
            return {
              ...snippet,
              text: snippet.text.split('.').reverse().join('. ')
            };
          }
          return snippet;
        })
      );
      setIsProcessing(false);
    }, 1000);
  };

  const handleSimplify = (snippetId: string | null) => {
    setIsProcessing(true);
    setTimeout(() => {
      setContent(prevContent =>
        prevContent.map(snippet => {
          if (!snippetId || snippet.id === snippetId) {
            return {
              ...snippet,
              text: snippet.text.split(' ').filter(word => word.length < 8).join(' ')
            };
          }
          return snippet;
        })
      );
      setIsProcessing(false);
    }, 1000);
  };

  const handleShowOriginal = (snippetId: string | null) => {
    if (snippetId) {
      const originalSnippet = originalContent.find(s => s.id === snippetId);
      if (originalSnippet) {
        setContent(prevContent =>
          prevContent.map(snippet =>
            snippet.id === snippetId ? { ...originalSnippet, isHighlighted: true } : snippet
          )
        );
      }
    } else {
      setContent(originalContent);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <div className="container mx-auto py-4">
        <Navigation />
        <div className="flex gap-6">
          <div className="flex-1">
            <DocumentViewer 
              content={content} 
              isLoading={isProcessing} 
              onSnippetClick={handleSnippetClick}
            />
          </div>
          <Sidebar
            onRewrite={handleRewrite}
            onSimplify={handleSimplify}
            onShowOriginal={handleShowOriginal}
            isProcessing={isProcessing}
            selectedSnippetId={selectedSnippetId}
          />
        </div>
      </div>
    </div>
  );
};

export default Saksdokument;