import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        username: 'mrhamad',
        rank: '119767',
        points: 8471,
        roomsCompleted: 91,
        badgesEarned: 17,
        streak: 1,
        level: 8,
        completedPercentage: 45,
    });
}
