import { NextResponse } from 'next/server';

// Temporary storage for suppliers (replace with your database implementation)
let suppliers = [
  {
    name: "Sample Supplier 1",
    code: "SUP001",
    address: "123 Main St",
    pan: "12345678",
    phone: "9876543210",
    group: "General"
  }
];

export async function GET() {
  try {
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch suppliers' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newSupplier = await request.json();
    
    // Validate required fields
    if (!newSupplier.name) {
      return NextResponse.json(
        { error: 'Supplier name is required' },
        { status: 400 }
      );
    }

    // Generate a unique code if not provided
    if (!newSupplier.code) {
      newSupplier.code = `SUP${(suppliers.length + 1).toString().padStart(3, '0')}`;
    }

    // Add to suppliers array
    suppliers.push(newSupplier);

    return NextResponse.json(newSupplier);
  } catch (error) {
    console.error('Error creating supplier:', error);
    return NextResponse.json(
      { error: 'Failed to create supplier' },
      { status: 500 }
    );
  }
}