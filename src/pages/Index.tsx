import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DocumentViewer } from '@/components/DocumentViewer';
import { Sidebar } from '@/components/Sidebar';
import { toast } from 'sonner';

interface TextSnippet {
  id: string;
  text: string;
  isHighlighted: boolean;
}

const dummySnippets: TextSnippet[] = [
  {
    id: '1',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    isHighlighted: false
  },
  {
    id: '2',
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    isHighlighted: false
  },
  {
    id: '3',
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    isHighlighted: false
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Document Processor</h1>
        
        <div className="grid grid-cols-1 gap-8 mb-8">
          <FileUpload onFilesUploaded={handleFilesUploaded} />
        </div>

        <div className="flex gap-8">
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