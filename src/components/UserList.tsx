'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Search, Download, ExternalLink, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { exportToCSV } from '@/lib/instagram';

interface UserListProps {
  users: string[];
  emptyMessage: string;
  csvFilename: string;
}

export function UserList({ users, emptyMessage, csvFilename }: UserListProps) {
  const [search, setSearch] = useState('');
  const [copiedUser, setCopiedUser] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered = useMemo(
    () => users.filter(u => u.toLowerCase().includes(search.toLowerCase())),
    [users, search]
  );

  const copyUser = async (username: string) => {
    await navigator.clipboard.writeText(username);
    setCopiedUser(username);
    toast.success(`@${username} copied to clipboard`);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopiedUser(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(users.join('\n'));
    setAllCopied(true);
    toast.success(`${users.length} usernames copied to clipboard`);
    setTimeout(() => setAllCopied(false), 2000);
  };

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
        <Users className="h-10 w-10 opacity-30" />
        <p className="text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search usernames..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8"
            aria-label="Search usernames"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" onClick={copyAll} className="gap-1.5">
            {allCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            Copy All
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToCSV(users, csvFilename)} className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-8">
          No results for &ldquo;{search}&rdquo;
        </p>
      ) : (
        <div className="space-y-1 max-h-[420px] overflow-y-auto rounded-lg pr-1">
          <AnimatePresence initial={false}>
            {filtered.map((username, index) => (
              <motion.div
                key={username}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ delay: Math.min(index * 0.015, 0.4) }}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/40 hover:bg-muted/70 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    aria-hidden
                    className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 flex items-center justify-center text-white text-xs font-bold select-none"
                  >
                    {username[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium truncate">@{username}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => copyUser(username)}
                    aria-label={`Copy @${username}`}
                  >
                    {copiedUser === username ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                    <a
                      href={`https://instagram.com/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit @${username} on Instagram`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-right">
        {search ? `${filtered.length} of ${users.length} results` : `${users.length} total`}
      </p>
    </div>
  );
}
