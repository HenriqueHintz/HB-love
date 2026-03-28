import React from 'react';
import { Trash2, Image as ImageIcon, Video, FileText } from 'lucide-react';

interface MediaUploadFieldProps {
  mediaUrl: string;
  mediaType?: 'image' | 'video' | 'document';
  mediaName?: string;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  height?: string;
  accept?: string;
  label?: string;
}

export const MediaUploadField: React.FC<MediaUploadFieldProps> = ({
  mediaUrl,
  mediaType,
  mediaName,
  onFileUpload,
  onClear,
  height = 'h-48',
  accept,
  label = 'Mídia (Foto, Vídeo ou Arquivo)',
}) => {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-[#9A9590] dark:text-[#5A5650] mb-1 uppercase tracking-wider">
          {label}
        </label>
      )}
      {mediaUrl ? (
        <div
          className={`relative rounded-xl overflow-hidden border border-white/6 ${height} group bg-[#141418] flex items-center justify-center`}
        >
          {mediaType === 'video' ? (
            <video src={mediaUrl} controls className="w-full h-full object-contain" />
          ) : mediaType === 'document' ? (
            <div className="flex flex-col items-center gap-2 text-[#9A9590] dark:text-[#5A5650] p-4">
              <FileText size={48} />
              <span className="text-sm font-medium text-center break-all">{mediaName}</span>
            </div>
          ) : (
            <img src={mediaUrl} alt="Preview" className="w-full h-full object-contain" loading="lazy" />
          )}
          <button
            type="button"
            onClick={onClear}
            className="absolute top-2 right-2 bg-red-500/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full ${height} border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-[#141418]/50/50 hover:bg-[#141418]/80 transition-colors`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="flex gap-2 text-[#5A5650] mb-2">
              <ImageIcon size={24} />
              <Video size={24} />
              <FileText size={24} />
            </div>
            <p className="text-sm text-[#9A9590] dark:text-[#5A5650]">
              <span className="font-semibold text-[#D4A574]">Clique para enviar</span> ou arraste
            </p>
            <p className="text-xs text-[#5A5650] mt-1">Máx. 4MB</p>
          </div>
          <input type="file" className="hidden" accept={accept} onChange={onFileUpload} />
        </label>
      )}
    </div>
  );
};
