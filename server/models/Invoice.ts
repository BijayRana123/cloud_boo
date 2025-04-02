import mongoose from 'mongoose';

export enum InvoiceType {
  SALES = 'sales',
  PURCHASE = 'purchase',
}

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled',
}

const lineItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  amount: {
    type: Number,
    required: true,
  },
  vatRate: {
    type: Number,
    default: 13, // Default VAT rate in Nepal
  },
  vatAmount: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: Object.values(InvoiceType),
    required: true,
  },
  date: {
    gregorian: {
      type: Date,
      required: true,
    },
    nepali: {
      type: String,
      required: true,
    },
  },
  dueDate: {
    gregorian: {
      type: Date,
      required: true,
    },
    nepali: {
      type: String,
      required: true,
    },
  },
  customer: {
    name: {
      type: String,
      required: true,
    },
    address: String,
    email: String,
    phone: String,
    panNumber: String,
  },
  lineItems: [lineItemSchema],
  subtotal: {
    type: Number,
    required: true,
  },
  vatTotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(InvoiceStatus),
    default: InvoiceStatus.DRAFT,
  },
  notes: String,
  terms: String,
  company: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  },
}, {
  timestamps: true,
});

// Create indexes for efficient querying
invoiceSchema.index({ company: 1, 'date.gregorian': -1 });
invoiceSchema.index({ invoiceNumber: 1 }, { unique: true });
invoiceSchema.index({ 'customer.name': 1 });

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);

export default Invoice;