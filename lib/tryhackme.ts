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
    const res = await fetch(
      `https://tryhackme.com/api/user/exist/${username}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return { ...FALLBACK, username };

    // The /exist endpoint only confirms user existence.
    // Attempt the public stats endpoint as well.
    const statsRes = await fetch(
      `https://tryhackme.com/api/user/${username}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!statsRes.ok) return { ...FALLBACK, username };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = await statsRes.json();

    return {
      username,
      rank: data?.rank ?? data?.userRank ?? FALLBACK.rank,
      points: Number(data?.points ?? data?.totalPoints ?? FALLBACK.points),
      roomsCompleted: Number(
        data?.completedRooms ?? data?.roomsCompleted ?? FALLBACK.roomsCompleted
      ),
      badgesEarned: Number(
        data?.badges ?? data?.badgesEarned ?? FALLBACK.badgesEarned
      ),
      streak: Number(data?.streak ?? FALLBACK.streak),
      level: Number(data?.level ?? FALLBACK.level),
      completedPercentage: Number(
        data?.completedPercentage ?? FALLBACK.completedPercentage
      ),
    };
  } catch {
    return { ...FALLBACK, username };
  }
}
