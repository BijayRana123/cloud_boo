import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import Transaction from '@/server/models/Transaction';
import { calculateNetAmount } from '@/server/utils/financialCalculations';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { amount, type, description, category, date, company } = data;

    if (!amount || !type || !description || !category || !date || !company) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate unique transaction number
    const transactionCount = await Transaction.countDocuments({ company });
    const transactionNumber = `TRX-${company.substring(0, 3).toUpperCase()}-${String(
      transactionCount + 1
    ).padStart(6, '0')}`;

    // Calculate VAT and net amount
    const { vatAmount, netAmount } = calculateNetAmount({
      amount,
      vatRate: 13, // Nepal's standard VAT rate
    });

    const transaction = new Transaction({
      ...data,
      transactionNumber,
      vatAmount,
      amount: netAmount,
      createdBy: session.user.id,
    });

    await transaction.save();

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error('Transaction creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = {};

    if (company) query.company = company;
    if (type) query.type = type;
    if (startDate && endDate) {
      query['date.gregorian'] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const skip = (page - 1) * limit;

    const [transactions, total] = await Promise.all([
      Transaction.find(query)
        .sort({ 'date.gregorian': -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email'),
      Transaction.countDocuments(query),
    ]);

    return NextResponse.json({
      transactions,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Transaction fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}