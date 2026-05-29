'use client';

import { useState, useCallback } from 'react';
import { parseFollowers, parseFollowing, analyzeFollowers } from '@/lib/instagram';
import type { AnalysisResult, FileUploadType } from '@/types/instagram';

interface UseInstagramAnalysisReturn {
  followersLoaded: boolean;
  followingLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
  handleFileUpload: (file: File, type: FileUploadType) => Promise<void>;
  analyze: () => void;
  reset: () => void;
}

export function useInstagramAnalysis(): UseInstagramAnalysisReturn {
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [followersLoaded, setFollowersLoaded] = useState(false);
  const [followingLoaded, setFollowingLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileUpload = useCallback(async (file: File, type: FileUploadType) => {
    setIsLoading(true);
    setError(null);
    try {
      const text = await file.text();
      let data: unknown;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Invalid JSON file. Please upload a valid Instagram export file.');
      }
      if (type === 'followers') {
        const parsed = parseFollowers(data);
        setFollowers(parsed);
        setFollowersLoaded(true);
      } else {
        const parsed = parseFollowing(data);
        setFollowing(parsed);
        setFollowingLoaded(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyze = useCallback(() => {
    if (!followersLoaded || !followingLoaded) return;
    setResult(analyzeFollowers(followers, following));
  }, [followers, following, followersLoaded, followingLoaded]);

  const reset = useCallback(() => {
    setFollowers([]);
    setFollowing([]);
    setFollowersLoaded(false);
    setFollowingLoaded(false);
    setError(null);
    setResult(null);
  }, []);

  return { followersLoaded, followingLoaded, isLoading, error, result, handleFileUpload, analyze, reset };
}
