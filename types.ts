export interface UploadedImage {
  id: string;
  url: string; // Base64 or Object URL
  file: File;
  caption: string | null;
  loading: boolean;
  error?: string;
  timestamp: number;
}

export type ImageStatus = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'error';
