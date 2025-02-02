import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { FolderOpen, FileText } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [folderPath, setFolderPath] = useState<string>('');
  const [extractionPrompt, setExtractionPrompt] = useState<string>('');

  const handleFolderSelect = async () => {
    // In a real implementation, this would use the File System Access API
    // For now, we'll simulate folder selection
    setFolderPath('/example/saksmappe/123');
    toast.success('Mappe valgt');
  };

  const handleGenerateSaksdokument = () => {
    if (!folderPath) {
      toast.error('Vennligst velg en mappe først');
      return;
    }
    if (!extractionPrompt.trim()) {
      toast.error('Vennligst skriv hva som skal ekstraheres');
      return;
    }
    // Store the folder path and prompt in sessionStorage for other pages
    sessionStorage.setItem('selectedFolder', folderPath);
    sessionStorage.setItem('extractionPrompt', extractionPrompt);
    navigate('/saksdokument');
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C] text-white p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">NAV Saksbehandling</h1>
          <p className="text-gray-400">
            Automatisk analyse og sammenstilling av saksdokumenter
          </p>
        </div>

        <div className="bg-[#1E2433] p-6 rounded-lg space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Velg saksmappe</h2>
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleFolderSelect}
                className="flex items-center gap-2"
              >
                <FolderOpen className="w-4 h-4" />
                Velg mappe
              </Button>
              {folderPath && (
                <span className="text-gray-400">
                  Valgt mappe: {folderPath}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Hva skal ekstraheres?</h2>
            <Textarea
              value={extractionPrompt}
              onChange={(e) => setExtractionPrompt(e.target.value)}
              placeholder="F.eks.: Ekstraher all informasjon relatert til skadeomfang og arbeidsevne..."
              className="h-32 text-white placeholder:text-gray-400"
            />
          </div>

          <Button
            onClick={handleGenerateSaksdokument}
            className="w-full flex items-center justify-center gap-2"
            size="lg"
          >
            <FileText className="w-4 h-4" />
            Generer saksdokument
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#1E2433] p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">1. Velg saksmappe</h3>
            <p className="text-sm text-gray-400">
              Last inn alle dokumenter fra en spesifikk saksmappe
            </p>
          </div>
          <div className="bg-[#1E2433] p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">2. Spesifiser behov</h3>
            <p className="text-sm text-gray-400">
              Beskriv hvilken informasjon som skal ekstraheres
            </p>
          </div>
          <div className="bg-[#1E2433] p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">3. Gjennomgå resultat</h3>
            <p className="text-sm text-gray-400">
              Se over det genererte dokumentet og gjør eventuelle justeringer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;