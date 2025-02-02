import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DocumentViewer } from '@/components/DocumentViewer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText } from 'lucide-react';
import { Navigation } from '@/components/Navigation';

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
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <div className="container mx-auto py-4">
        <Navigation />
        
        {/* PDF Selection at the top */}
        <div className="mb-6 bg-[#1E2433] p-4 rounded-lg">
          <h2 className="text-white font-semibold mb-4">Velg dokument for gjennomgang</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {dummyDocuments.map((doc) => (
              <Button
                key={doc.id}
                variant={selectedDocument?.id === doc.id ? "secondary" : "ghost"}
                className="whitespace-nowrap"
                onClick={() => setSelectedDocument(doc)}
              >
                <FileText className="mr-2 h-4 w-4" />
                {doc.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1E2433] rounded-lg p-6">
            {selectedDocument ? (
              <div className="space-y-4">
                <h2 className="text-white font-semibold">{selectedDocument.name}</h2>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="text-white whitespace-pre-wrap">
                    {selectedDocument.content}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <FileText className="h-12 w-12 mx-auto mb-4" />
                <p>Velg et dokument fra listen over</p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <DocumentViewer
              content={dummyDocuments.map(doc => ({
                id: doc.id,
                text: doc.content,
                isHighlighted: false,
                status: 'info',
                title: doc.name,
                description: 'Automatisk analysert innhold'
              }))}
              isLoading={false}
              onSnippetClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualReview;