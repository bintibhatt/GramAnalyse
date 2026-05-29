'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { UploadSection } from '@/components/UploadSection';
import { AnalysisResults } from '@/components/AnalysisResults';
import { useInstagramAnalysis } from '@/hooks/useInstagramAnalysis';

export default function Home() {
  const { followersLoaded, followingLoaded, isLoading, result, handleFileUpload, analyze, reset } =
    useInstagramAnalysis();

  return (
    <div className="min-h-screen flex flex-col">
      <Header onReset={reset} showReset={!!result} />
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-10 sm:py-16">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="upload" exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}>
              <UploadSection
                followersLoaded={followersLoaded}
                followingLoaded={followingLoaded}
                isLoading={isLoading}
                onFileUpload={handleFileUpload}
                onAnalyze={analyze}
              />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <AnalysisResults result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t py-4 text-center text-xs text-muted-foreground">
        Your data never leaves your browser &mdash; 100% private, no server uploads.
      </footer>
    </div>
  );
}
