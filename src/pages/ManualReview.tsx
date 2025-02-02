import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DocumentViewer } from '@/components/DocumentViewer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Document {
  id: string;
  name: string;
  content: string;
}

const dummyDocuments: Document[] = [
  {
    id: '1',
    name: 'MR-undersøkelse.pdf',
    content: 'MR-undersøkelse av høyre kne utført 15.03.2024: Undersøkelsen viser en komplett ruptur av fremre korsbånd (ACL) med assosiert beinmargsødem i laterale femurkondyl og laterale tibiaplatå. Det ses også en grad II skade av det mediale kollateralligamentet.'
  },
  {
    id: '2',
    name: 'NAV_Vedtak.pdf',
    content: 'Vedtak fra NAV Arbeid og Ytelser datert 01.04.2024: Basert på dokumentert skade under arbeidstid 10.03.2024 og påfølgende medisinsk vurdering, innvilges søker rett til arbeidsavklaringspenger i henhold til folketrygdloven § 11-5. Vedtaket gjelder fra 15.03.2024 til 15.09.2024.'
  },
  {
    id: '3',
    name: 'Spesialistvurdering.pdf',
    content: 'Spesialistvurdering fra Oslo Universitetssykehus 20.03.2024: Pasienten har betydelig redusert arbeidsevne grunnet skaden. Operasjon er planlagt 05.04.2024, med forventet rehabiliteringsperiode på 6-8 måneder. Pasienten vil ikke kunne returnere til sitt vanlige arbeid som bygningsarbeider i denne perioden.'
  }
];

const ManualReview = () => {
  const navigate = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [highlightedText, setHighlightedText] = useState<string>('');

  const handleDocumentSelect = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const handleTextHighlight = () => {
    // In a real implementation, this would handle text highlighting and tracking
    console.log('Highlighting:', highlightedText);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between mb-6 text-white">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/saksdokument')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">Manuell Gjennomgang</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1E2433] rounded-lg p-6">
            <h2 className="text-white font-semibold mb-4">Originaldokumenter</h2>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {dummyDocuments.map((doc) => (
                  <Button
                    key={doc.id}
                    variant={selectedDocument?.id === doc.id ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleDocumentSelect(doc)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {doc.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="space-y-4">
            {selectedDocument ? (
              <DocumentViewer
                content={[{
                  id: selectedDocument.id,
                  text: selectedDocument.content,
                  isHighlighted: false
                }]}
                isLoading={false}
                onSnippetClick={() => {}}
              />
            ) : (
              <div className="bg-[#1E2433] rounded-lg p-6 text-center text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <p>Velg et dokument fra listen til venstre</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualReview;