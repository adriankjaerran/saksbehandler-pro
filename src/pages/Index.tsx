import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { DocumentViewer } from '@/components/DocumentViewer';
import { Sidebar } from '@/components/Sidebar';
import { toast } from 'sonner';

const Index = () => {
  const [content, setContent] = useState<string>('');
  const [originalContent, setOriginalContent] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFilesUploaded = async (files: File[]) => {
    setIsProcessing(true);
    try {
      // Simulate processing multiple documents
      const contents = await Promise.all(
        files.map(file => file.text())
      );
      
      const combinedContent = contents.join('\n\n');
      setOriginalContent(combinedContent);
      setContent(combinedContent);
    } catch (error) {
      toast.error('Error processing files');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRewrite = () => {
    setIsProcessing(true);
    // Simulate rewriting
    setTimeout(() => {
      setContent(content.split('.').reverse().join('. '));
      setIsProcessing(false);
    }, 1000);
  };

  const handleSimplify = () => {
    setIsProcessing(true);
    // Simulate simplifying
    setTimeout(() => {
      setContent(content.split(' ').filter(word => word.length < 8).join(' '));
      setIsProcessing(false);
    }, 1000);
  };

  const handleShowOriginal = () => {
    setContent(originalContent);
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
            <DocumentViewer content={content} isLoading={isProcessing} />
          </div>
          
          <Sidebar
            onRewrite={handleRewrite}
            onSimplify={handleSimplify}
            onShowOriginal={handleShowOriginal}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;