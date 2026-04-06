export interface TryHackMeProfile {
  username: string;
  rank: string;
  points: number;
  roomsCompleted: number;
  badgesEarned: number;
  streak: number;
  level: number;
  completedPercentage: number;
}

export const TRYHACKME_FALLBACK: TryHackMeProfile = {
  username: "mrhamad",
  rank: "Hacker",
  points: 0,
  roomsCompleted: 0,
  badgesEarned: 0,
  streak: 0,
  level: 1,
  completedPercentage: 0,
};
