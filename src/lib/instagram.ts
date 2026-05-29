import type { InstagramFollowerEntry, InstagramFollowingData, AnalysisResult } from '@/types/instagram';

export function parseFollowers(data: unknown): string[] {
  if (!Array.isArray(data)) {
    throw new Error('Invalid followers file: expected a JSON array.');
  }
  return (data as InstagramFollowerEntry[]).map((item, index) => {
    const username = item?.string_list_data?.[0]?.value;
    if (!username) throw new Error(`Invalid followers data at index ${index}: missing username.`);
    return username;
  });
}

export function parseFollowing(data: unknown): string[] {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid following file: expected a JSON object.');
  }
  const followingData = data as InstagramFollowingData;
  if (!Array.isArray(followingData.relationships_following)) {
    throw new Error('Invalid following file: missing "relationships_following" key.');
  }
  return followingData.relationships_following.map((item, index) => {
    const username = item?.title;
    if (!username) throw new Error(`Invalid following data at index ${index}: missing username.`);
    return username;
  });
}

export function analyzeFollowers(followers: string[], following: string[]): AnalysisResult {
  const followersSet = new Set(followers);
  const notFollowingBack = following.filter(user => !followersSet.has(user));
  const mutualFollowers = following.filter(user => followersSet.has(user));
  return {
    notFollowingBack,
    mutualFollowers,
    followersCount: followers.length,
    followingCount: following.length,
  };
}

export function exportToCSV(users: string[], filename: string): void {
  const header = 'Username,Instagram URL\n';
  const rows = users.map(u => `${u},https://instagram.com/${u}`).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
