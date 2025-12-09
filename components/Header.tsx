import React from 'react';
import { Camera, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Camera size={24} />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            SnapShare AI
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <Sparkles size={16} className="text-amber-500 mr-2" />
            <span>Powered by Gemini 2.5</span>
          </div>
        </div>
      </div>
    </header>
  );
};
