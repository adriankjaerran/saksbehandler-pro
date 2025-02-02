import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DocumentViewer } from '@/components/DocumentViewer';
import { Sidebar } from '@/components/Sidebar';
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
    text: "NOW, THEREFORE, in consideration of the covenants and agreements set forth in this Agreement, and for other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, Organisation 1 and Organisation 2 hereby agree as follows:",
    isHighlighted: false,
    status: 'info',
    title: 'Non-solicitation terms assessment',
    description: 'The Joint Venture Agreement does not explicitly mention non-solicitation terms.'
  },
  {
    id: '2',
    text: "4.0 Distributive Share. The net operating income and net operating loss of the Joint Venture shall be allocated and shared between and shared by the Joint Venture Parties in proportion to their performance of work.",
    isHighlighted: false,
    status: 'success',
    title: 'Equitable Profit and Loss Distribution Formula',
    description: 'This formula ensures that profits and losses are distributed based on the actual contribution of each party, which is a fair approach to allocation.'
  },
  {
    id: '3',
    text: "3.0 Percentage Ownership. Each Venturer's respective interest in the Joint Venture (hereinafter called "Percentage Ownership Interest") is indicated below: Organisation 1 - Fifty-one percent (51%), Organisation 2 - Forty-nine percent (49%).",
    isHighlighted: false,
    status: 'warning',
    title: 'Lack of Explicit Mutual Objectives Balance',
    description: 'While the agreement specifies percentage ownership and responsibilities, it lacks a clear statement on how the joint venture's goals will be aligned to benefit both parties equally.'
  }
];

const Index = () => {
  const [content, setContent] = useState<TextSnippet[]>(dummySnippets);
  const [originalContent, setOriginalContent] = useState<TextSnippet[]>(dummySnippets);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(null);

  const handleFilesUploaded = async (files: File[]) => {
    setIsProcessing(true);
    try {
      const contents = await Promise.all(
        files.map(file => file.text())
      );
      
      const newSnippets = contents.map((text, index) => ({
        id: `uploaded-${index}`,
        text,
        isHighlighted: false
      }));

      setOriginalContent(newSnippets);
      setContent(newSnippets);
    } catch (error) {
      toast.error('Error processing files');
    } finally {
      setIsProcessing(false);
    }
  };

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
        <div className="flex items-center justify-between mb-6 text-white">
          <h1 className="text-xl font-semibold">Joint Venture Agreement</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Anonymisation</span>
            <span className="bg-[#FFE81E] text-black px-3 py-1 rounded-full text-sm">Time Saved: 1 hour 55min</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          <FileUpload onFilesUploaded={handleFilesUploaded} />
        </div>

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

export default Index;