import React from 'react';
import { UploadedImage } from '../types';
import { Share2, Trash2, Maximize2, Sparkles, AlertCircle } from 'lucide-react';

interface ImageCardProps {
  image: UploadedImage;
  onDelete: (id: string) => void;
  onShare: (image: UploadedImage) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete, onShare }) => {
  return (
    <div className="group relative break-inside-avoid mb-6 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-auto w-full overflow-hidden bg-slate-100">
        <img
          src={image.url}
          alt="Uploaded content"
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay Controls */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={() => onShare(image)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-indigo-600 hover:bg-white transition-colors shadow-sm"
            title="Share"
          >
            <Share2 size={16} />
          </button>
          <button 
            onClick={() => onDelete(image.id)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-700 hover:text-red-600 hover:bg-white transition-colors shadow-sm"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {image.loading ? (
              <div className="flex items-center space-x-2 text-indigo-600 animate-pulse">
                <Sparkles size={16} />
                <span className="text-xs font-medium">AI is writing a caption...</span>
              </div>
            ) : image.error ? (
              <div className="flex items-center space-x-2 text-red-500">
                <AlertCircle size={16} />
                <span className="text-xs">{image.error}</span>
              </div>
            ) : (
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                {image.caption}
              </p>
            )}
            <p className="text-xs text-slate-400 mt-2">
              {new Date(image.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
