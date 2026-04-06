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
  rank: "119767",
  points: 8471,
  roomsCompleted: 91,
  badgesEarned: 17,
  streak: 1,
  level: 8,
  completedPercentage: 45,
};

export async function getTryHackMeProfile(
  username: string
): Promise<TryHackMeProfile> {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/tryhackme`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return { ...FALLBACK, username };

    return await res.json();
  } catch (error) {
    console.error('Error fetching TryHackMe profile:', error);
    return { ...FALLBACK, username };
  }
}
