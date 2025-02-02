import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { FolderOpen, FileText } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/FileUpload";

const Landing = () => {
  const navigate = useNavigate();
  const [extractionPrompt, setExtractionPrompt] = useState<string>('');

  // Always navigate to saksdokument regardless of input
  const handleGenerateSaksdokument = () => {
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
            <h2 className="text-xl font-semibold">Hva skal ekstraheres?</h2>
            <Input
              value={extractionPrompt}
              onChange={(e) => setExtractionPrompt(e.target.value)}
              className="text-black dark:text-white bg-white dark:bg-gray-800"
              placeholder="F.eks.: Finn alle datoer og frister..."
            />
          </div>

          <FileUpload onFilesUploaded={handleGenerateSaksdokument} />

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
            <h3 className="font-semibold mb-2">1. Velg dokumenter</h3>
            <p className="text-sm text-gray-400">
              Last opp dokumentene som skal analyseres
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