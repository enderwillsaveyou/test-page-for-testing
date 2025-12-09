import React from 'react';
import { UploadedImage } from '../types';
import { ImageCard } from './ImageCard';

interface GalleryProps {
  images: UploadedImage[];
  onDelete: (id: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ images, onDelete }) => {
  const handleShare = async (image: UploadedImage) => {
    if (navigator.share) {
      try {
        // We need to convert base64 back to a blob to share it as a file
        const res = await fetch(image.url);
        const blob = await res.blob();
        const file = new File([blob], "image.png", { type: blob.type });

        await navigator.share({
          title: 'Check out this photo!',
          text: image.caption || 'Shared via SnapShare AI',
          files: [file]
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: Copy caption to clipboard
      if (image.caption) {
        navigator.clipboard.writeText(image.caption);
        alert('Caption copied to clipboard!');
      }
    }
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-20 opacity-50">
        <p className="text-xl text-slate-400 font-light">No photos yet. Start by uploading one!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Masonry Layout using Tailwind columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {images.map((img) => (
          <ImageCard 
            key={img.id} 
            image={img} 
            onDelete={onDelete}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
};
