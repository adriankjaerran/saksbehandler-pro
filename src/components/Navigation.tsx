import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/saksdokument':
        return 'NAV Saksbehandling - Yrkesskade';
      case '/manual-review':
        return 'Manuell Gjennomgang';
      default:
        return 'NAV Saksbehandling';
    }
  };

  return (
    <div className="flex items-center justify-between mb-6 text-white">
      <div className="flex items-center gap-4">
        {location.pathname !== '/' && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h1 className="text-xl font-semibold">{getTitle()}</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Automatisk Analyse</span>
        <span className="bg-[#FFE81E] text-black px-3 py-1 rounded-full text-sm">
          Tid Spart: 2 timer 15min
        </span>
      </div>
    </div>
  );
};