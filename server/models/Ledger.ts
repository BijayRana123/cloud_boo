import mongoose from 'mongoose';

export enum EntryType {
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export enum AccountType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  EQUITY = 'equity',
  REVENUE = 'revenue',
  EXPENSE = 'expense',
}

const ledgerSchema = new mongoose.Schema({
  entryNumber: {
    type: String,
    required: true,
    unique: true,
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
  accountCode: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: Object.values(AccountType),
    required: true,
  },
  entryType: {
    type: String,
    enum: Object.values(EntryType),
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction',
  },
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

// Create indexes for efficient querying
ledgerSchema.index({ company: 1, 'date.gregorian': -1 });
ledgerSchema.index({ entryNumber: 1 }, { unique: true });
ledgerSchema.index({ accountCode: 1, accountType: 1 });

const Ledger = mongoose.models.Ledger || mongoose.model('Ledger', ledgerSchema);

export default Ledger;