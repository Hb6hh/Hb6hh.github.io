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
    // Call the local API route instead of TryHackMe API directly
    // This runs on Vercel's servers, bypassing firewall restrictions
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/tryhackme`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) return { ...FALLBACK, username };

    return await res.json();
  } catch (error) {
    console.error('Error fetching TryHackMe profile:', error);
    return { ...FALLBACK, username };
  }
}