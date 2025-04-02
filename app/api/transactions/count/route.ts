import { NextResponse } from 'next/server';
import Transaction from '@/server/models/Transaction';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    await connectDB();
    const count = await Transaction.countDocuments();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error getting transaction count:', error);
    return NextResponse.json(
      { error: 'Failed to get transaction count' },
      { status: 500 }
    );
  }
}