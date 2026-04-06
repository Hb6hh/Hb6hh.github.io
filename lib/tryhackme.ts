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

/** Shape of the TryHackMe public user API response (best-effort). */
interface TryHackMeApiResponse {
  rank?: string;
  userRank?: string;
  points?: number | string;
  totalPoints?: number | string;
  completedRooms?: number | string;
  roomsCompleted?: number | string;
  badges?: number | string;
  badgesEarned?: number | string;
  streak?: number | string;
  level?: number | string;
  completedPercentage?: number | string;
}

const FALLBACK: TryHackMeProfile = {
  username: "mrhamad",
  rank: "Hacker",
  points: 0,
  roomsCompleted: 0,
  badgesEarned: 0,
  streak: 0,
  level: 1,
  completedPercentage: 0,
};

export async function getTryHackMeProfile(
  username: string
): Promise<TryHackMeProfile> {
  try {
    const res = await fetch(`https://tryhackme.com/api/user/${username}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return { ...FALLBACK, username };

    const data: TryHackMeApiResponse = await res.json();

    return {
      username,
      rank: data.rank ?? data.userRank ?? FALLBACK.rank,
      points: Number(data.points ?? data.totalPoints ?? FALLBACK.points),
      roomsCompleted: Number(
        data.completedRooms ?? data.roomsCompleted ?? FALLBACK.roomsCompleted
      ),
      badgesEarned: Number(
        data.badges ?? data.badgesEarned ?? FALLBACK.badgesEarned
      ),
      streak: Number(data.streak ?? FALLBACK.streak),
      level: Number(data.level ?? FALLBACK.level),
      completedPercentage: Number(
        data.completedPercentage ?? FALLBACK.completedPercentage
      ),
    };
  } catch {
    return { ...FALLBACK, username };
  }
}
