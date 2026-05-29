'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { FileDropzone } from './FileDropzone';
import type { FileUploadType } from '@/types/instagram';

interface UploadSectionProps {
  followersLoaded: boolean;
  followingLoaded: boolean;
  isLoading: boolean;
  onFileUpload: (file: File, type: FileUploadType) => Promise<void>;
  onAnalyze: () => void;
}

export function UploadSection({
  followersLoaded,
  followingLoaded,
  isLoading,
  onFileUpload,
  onAnalyze,
}: UploadSectionProps) {
  const canAnalyze = followersLoaded && followingLoaded && !isLoading;
  const prevFollowers = useRef(false);
  const prevFollowing = useRef(false);

  useEffect(() => {
    if (followersLoaded && !prevFollowers.current) {
      toast.success('Followers file loaded successfully');
    }
    prevFollowers.current = followersLoaded;
  }, [followersLoaded]);

  useEffect(() => {
    if (followingLoaded && !prevFollowing.current) {
      toast.success('Following file loaded successfully');
    }
    prevFollowing.current = followingLoaded;
  }, [followingLoaded]);

  const handleDrop = async (file: File, type: FileUploadType) => {
    try {
      await onFileUpload(file, type);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to parse file');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center space-y-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 mb-2">
          <span className="text-white text-xl font-bold">G</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Analyse Your Instagram
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
          Upload your Instagram data export to discover who doesn&apos;t follow you back
          and explore your mutual connections.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FileDropzone
          type="followers"
          isLoaded={followersLoaded}
          onFileAccepted={file => handleDrop(file, 'followers')}
          label="followers_1.json"
          description="From your Instagram data export"
        />
        <FileDropzone
          type="following"
          isLoaded={followingLoaded}
          onFileAccepted={file => handleDrop(file, 'following')}
          label="following.json"
          description="From the same data export package"
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button
          size="lg"
          disabled={!canAnalyze}
          onClick={onAnalyze}
          className="gap-2 px-10"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing&hellip;
            </>
          ) : (
            <>
              Analyse Now
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>

        {(!followersLoaded || !followingLoaded) && (
          <p className="text-xs text-muted-foreground">
            {!followersLoaded && !followingLoaded
              ? 'Upload both files to continue'
              : !followersLoaded
              ? 'Still need: followers_1.json'
              : 'Still need: following.json'}
          </p>
        )}
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 text-sm space-y-1.5">
        <div className="flex items-center gap-1.5 font-medium">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          How to get your Instagram data
        </div>
        <ol className="text-muted-foreground space-y-1 ml-5.5 text-xs list-decimal pl-2">
          <li>Go to Instagram &rarr; Settings &rarr; <strong>Your activity</strong></li>
          <li>Select <strong>Download your information</strong> &rarr; Request download</li>
          <li>Choose <strong>JSON</strong> format and request the data</li>
          <li>Extract the ZIP and upload <code>followers_1.json</code> and <code>following.json</code></li>
        </ol>
      </div>
    </motion.div>
  );
}
