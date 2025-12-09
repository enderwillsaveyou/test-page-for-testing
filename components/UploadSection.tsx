import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Loader2 } from 'lucide-react';

interface UploadSectionProps {
  onFilesSelected: (files: FileList | null) => void;
  isProcessing: boolean;
}

export const UploadSection: React.FC<UploadSectionProps> = ({ onFilesSelected, isProcessing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-8 px-4">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative group cursor-pointer
          border-3 border-dashed rounded-2xl p-10
          flex flex-col items-center justify-center text-center
          transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-50 scale-[1.02]' 
            : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50 bg-white'}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          multiple
          onChange={(e) => onFilesSelected(e.target.files)}
        />
        
        <div className={`
          p-4 rounded-full mb-4 transition-colors duration-300
          ${isDragging ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'}
        `}>
          {isProcessing ? (
            <Loader2 size={40} className="animate-spin" />
          ) : (
            <UploadCloud size={40} />
          )}
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mb-1">
          {isProcessing ? 'Processing Images...' : 'Upload Photos'}
        </h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          Drag & drop your memories here, or click to browse. We'll add AI captions automatically!
        </p>
        
        <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-focus-within:border-indigo-500" />
      </div>
    </div>
  );
};
