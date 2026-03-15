import { useState, useCallback } from 'react';

interface UseFileUploadOptions {
  maxSizeMB?: number;
  accept?: string[];
}

interface FileUploadState {
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'document' | undefined;
  mediaName: string;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { maxSizeMB = 4 } = options;
  const [state, setState] = useState<FileUploadState>({
    mediaUrl: '',
    mediaType: undefined,
    mediaName: '',
  });

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`O arquivo é muito grande. O limite é de ${maxSizeMB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        let type: 'image' | 'video' | 'document' = 'document';
        if (file.type.startsWith('image/')) type = 'image';
        else if (file.type.startsWith('video/')) type = 'video';

        setState({
          mediaUrl: reader.result as string,
          mediaType: type,
          mediaName: file.name,
        });
      };
      reader.readAsDataURL(file);
    },
    [maxSizeMB]
  );

  const clearMedia = useCallback(() => {
    setState({ mediaUrl: '', mediaType: undefined, mediaName: '' });
  }, []);

  const setMedia = useCallback(
    (url: string, type?: 'image' | 'video' | 'document', name?: string) => {
      setState({ mediaUrl: url, mediaType: type, mediaName: name || '' });
    },
    []
  );

  return {
    ...state,
    handleFileUpload,
    clearMedia,
    setMedia,
  };
}
