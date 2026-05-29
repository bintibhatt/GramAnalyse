import { motion } from 'framer-motion';
import { Users, UserCheck, UserX, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import type { AnalysisResult } from '@/types/instagram';

const statsConfig = [
  { key: 'followersCount', label: 'Followers', icon: Users, colorClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { key: 'followingCount', label: 'Following', icon: UserCheck, colorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  { key: 'notFollowingBackCount', label: "Don't Follow Back", icon: UserX, colorClass: 'bg-red-500/10 text-red-600 dark:text-red-400' },
  { key: 'mutualCount', label: 'Mutual', icon: Heart, colorClass: 'bg-green-500/10 text-green-600 dark:text-green-400' },
] as const;

interface StatsGridProps {
  result: AnalysisResult;
}

export function StatsGrid({ result }: StatsGridProps) {
  const stats: Record<string, number> = {
    followersCount: result.followersCount,
    followingCount: result.followingCount,
    notFollowingBackCount: result.notFollowingBack.length,
    mutualCount: result.mutualFollowers.length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn('p-2 rounded-lg shrink-0', stat.colorClass)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold tabular-nums">{stats[stat.key]}</p>
                  <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
