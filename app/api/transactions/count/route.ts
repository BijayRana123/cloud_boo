import { NextResponse } from 'next/server';
import Transaction from '@/server/models/Transaction';
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    // Ensure database connection
    const db = await connectDB();
    if (!db) {
      console.error('Database connection failed');
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Get transaction count
    const count = await Transaction.countDocuments();
    if (count === undefined) {
      console.error('Failed to get transaction count');
      return NextResponse.json(
        { error: 'Failed to get transaction count' },
        { status: 500 }
      );
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error in transaction count route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}