'use client';

import { Code2, Globe, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onReset?: () => void;
  showReset?: boolean;
}

export function Header({ onReset, showReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-xl items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
            <Code2 className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">GramAnalyse</span>
        </div>

        <div className="flex items-center gap-1">
          {showReset && (
            <Button variant="ghost" size="sm" onClick={onReset} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              New Analysis
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com/bintibhatt/GramAnalyse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
            >
              <Globe className="h-4 w-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
