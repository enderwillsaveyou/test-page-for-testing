import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { Gallery } from './components/Gallery';
import { UploadedImage } from './types';
import { fileToBase64, generateId } from './utils/fileUtils';
import { generateImageCaption } from './services/gemini';

const App: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processFile = useCallback(async (file: File) => {
    // 1. Create initial image object
    const base64 = await fileToBase64(file);
    const newImage: UploadedImage = {
      id: generateId(),
      url: base64,
      file: file,
      caption: null,
      loading: true,
      timestamp: Date.now(),
    };

    // 2. Add to state immediately to show preview
    setImages(prev => [newImage, ...prev]);

    // 3. Process with AI
    try {
      const caption = await generateImageCaption(base64, file.type);
      
      setImages(prev => prev.map(img => 
        img.id === newImage.id 
          ? { ...img, caption, loading: false }
          : img
      ));
    } catch (error) {
      setImages(prev => prev.map(img => 
        img.id === newImage.id 
          ? { ...img, error: 'Failed to generate caption', loading: false }
          : img
      ));
    }
  }, []);

  const handleFilesSelected = useCallback(async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    setIsProcessing(true);
    const files = Array.from(fileList);

    // Process sequentially to not hammer the browser/api too hard at once, 
    // though Promise.all is also fine for small batches.
    // Let's do parallel for better UX.
    await Promise.all(files.map(file => processFile(file)));
    
    setIsProcessing(false);
  }, [processFile]);

  const handleDelete = useCallback((id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow flex flex-col">
        {/* Hero / Upload Area */}
        <section className="bg-gradient-to-b from-white to-slate-50 pb-8">
          <div className="max-w-4xl mx-auto pt-12 px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Share your moments with <span className="text-indigo-600">Smart Captions</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Upload your photos and let our AI create the perfect caption for you to share with friends.
            </p>
            
            <UploadSection 
              onFilesSelected={handleFilesSelected} 
              isProcessing={isProcessing} 
            />
          </div>
        </section>

        {/* Gallery Area */}
        <section className="flex-grow bg-slate-50 pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Your Gallery</h3>
            <span className="text-sm text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
              {images.length} {images.length === 1 ? 'Photo' : 'Photos'}
            </span>
          </div>
          <Gallery images={images} onDelete={handleDelete} />
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} SnapShare AI. Built with Gemini 2.5.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
