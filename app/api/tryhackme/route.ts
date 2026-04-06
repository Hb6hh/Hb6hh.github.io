import { NextResponse } from 'next/server';

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
  username: 'mrhamad',
  rank: 'Hacker',
  points: 0,
  roomsCompleted: 0,
  badgesEarned: 0,
  streak: 0,
  level: 1,
  completedPercentage: 0,
};

export async function GET() {
  try {
    const res = await fetch('https://tryhackme.com/api/user/mrhamad', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      return NextResponse.json(
        { ...FALLBACK },
        {
          status: 200,
          headers: {
            'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        }
      );
    }

    const data: TryHackMeApiResponse = await res.json();

    const profile: TryHackMeProfile = {
      username: 'mrhamad',
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

    return NextResponse.json(profile, {
      headers: {
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error fetching TryHackMe profile:', error);
    return NextResponse.json(
      { ...FALLBACK },
      {
        status: 200,
        headers: {
          'cache-control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  }
}