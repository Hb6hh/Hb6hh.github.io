import { NextResponse } from "next/server";
import { TRYHACKME_FALLBACK } from "@/lib/tryhackme";

export const runtime = "edge";

const USER_AGENT = "Mozilla/5.0 (compatible; portfolio-bot/1.0)";

/** Only allow alphanumeric usernames and hyphens to prevent SSRF */
const USERNAME_RE = /^[a-zA-Z0-9_-]{1,50}$/;

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
  username?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("username") || "mrhamad";

  // Validate username to prevent SSRF / path traversal
  if (!USERNAME_RE.test(raw)) {
    return NextResponse.json(
      { error: "Invalid username" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`https://tryhackme.com/api/user/${raw}`, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { ...TRYHACKME_FALLBACK, username: raw },
        {
          status: 200,
          headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
        }
      );
    }

    const data: TryHackMeApiResponse = await res.json();

    const profile = {
      username: raw,
      rank: data.rank ?? data.userRank ?? TRYHACKME_FALLBACK.rank,
      points: Number(data.points ?? data.totalPoints ?? TRYHACKME_FALLBACK.points),
      roomsCompleted: Number(
        data.completedRooms ?? data.roomsCompleted ?? TRYHACKME_FALLBACK.roomsCompleted
      ),
      badgesEarned: Number(
        data.badges ?? data.badgesEarned ?? TRYHACKME_FALLBACK.badgesEarned
      ),
      streak: Number(data.streak ?? TRYHACKME_FALLBACK.streak),
      level: Number(data.level ?? TRYHACKME_FALLBACK.level),
      completedPercentage: Number(
        data.completedPercentage ?? TRYHACKME_FALLBACK.completedPercentage
      ),
    };

    return NextResponse.json(profile, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
    });
  } catch {
    return NextResponse.json(
      { ...TRYHACKME_FALLBACK, username: raw },
      {
        status: 200,
        headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
      }
    );
  }
}
