'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, XCircle, FileJson } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FileUploadType } from '@/types/instagram';

interface FileDropzoneProps {
  type: FileUploadType;
  isLoaded: boolean;
  onFileAccepted: (file: File) => void;
  label: string;
  description: string;
}

export function FileDropzone({ isLoaded, onFileAccepted, label, description }: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setIsDragOver(false);
      const file = acceptedFiles[0];
      if (!file) return;
      setFileName(file.name);
      setLocalError(null);
      onFileAccepted(file);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json'] },
    maxFiles: 1,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    onDropRejected: () => {
      setIsDragOver(false);
      setLocalError('Please upload a .json file.');
    },
  });

  return (
    <div
      {...getRootProps()}
      role="button"
      aria-label={`Upload ${label}`}
      className={cn(
        'relative flex min-h-[160px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 cursor-pointer transition-all duration-200 outline-none',
        isDragOver && 'border-primary bg-primary/5 scale-[1.02]',
        isLoaded && !isDragOver && 'border-green-500 bg-green-500/5',
        localError && !isDragOver && 'border-destructive bg-destructive/5',
        !isDragOver && !isLoaded && !localError &&
          'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
      )}
    >
      <input {...getInputProps()} />
      <AnimatePresence mode="wait">
        {isLoaded ? (
          <motion.div
            key="loaded"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <p className="text-sm font-medium text-green-700 dark:text-green-400">{fileName}</p>
            <p className="text-xs text-muted-foreground">Click or drop to replace</p>
          </motion.div>
        ) : localError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <XCircle className="h-10 w-10 text-destructive" />
            <p className="text-sm text-destructive">{localError}</p>
            <p className="text-xs text-muted-foreground">Click to try again</p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div className={cn('p-3 rounded-full transition-colors', isDragOver ? 'bg-primary/10' : 'bg-muted')}>
              {isDragOver ? (
                <Upload className="h-6 w-6 text-primary" />
              ) : (
                <FileJson className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-1 text-xs text-muted-foreground max-w-[200px]">{description}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {isDragOver ? 'Drop it here!' : 'Drag & drop or click to upload'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
