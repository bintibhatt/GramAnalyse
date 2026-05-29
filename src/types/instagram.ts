export interface InstagramStringListData {
  href: string;
  value?: string;
  timestamp: number;
}

export interface InstagramFollowerEntry {
  title: string;
  media_list_data: unknown[];
  string_list_data: InstagramStringListData[];
}

export interface InstagramFollowingEntry {
  title: string;
  string_list_data: InstagramStringListData[];
}

export interface InstagramFollowingData {
  relationships_following: InstagramFollowingEntry[];
}

export interface AnalysisResult {
  notFollowingBack: string[];
  mutualFollowers: string[];
  followersCount: number;
  followingCount: number;
}

export type FileUploadType = 'followers' | 'following';
