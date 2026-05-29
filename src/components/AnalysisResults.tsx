'use client';

import { motion } from 'framer-motion';
import { UserX, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { StatsGrid } from './StatsGrid';
import { UserList } from './UserList';
import type { AnalysisResult } from '@/types/instagram';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Analysis Complete</h2>
        <p className="text-sm text-muted-foreground">
          Here&apos;s a breakdown of your Instagram connections.
        </p>
      </div>

      <StatsGrid result={result} />

      <Tabs defaultValue="not-following-back">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="not-following-back" className="flex-1 sm:flex-none gap-1.5">
            <UserX className="h-4 w-4" />
            Not Following Back
            <Badge variant="destructive" className="ml-0.5 text-[10px] px-1.5 py-0">
              {result.notFollowingBack.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="mutual" className="flex-1 sm:flex-none gap-1.5">
            <Heart className="h-4 w-4" />
            Mutual Followers
            <Badge variant="secondary" className="ml-0.5 text-[10px] px-1.5 py-0">
              {result.mutualFollowers.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="not-following-back" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <UserX className="h-4 w-4 text-destructive" />
                People who don&apos;t follow you back
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UserList
                users={result.notFollowingBack}
                emptyMessage="Everyone follows you back!"
                csvFilename="not-following-back.csv"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mutual" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Heart className="h-4 w-4 text-green-500" />
                Your mutual connections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UserList
                users={result.mutualFollowers}
                emptyMessage="No mutual followers found."
                csvFilename="mutual-followers.csv"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
