# Project Requirements Document (PRD)

## 1. Project Overview
### **Title**: Cloud-Based Accounting Web App

### **Description**
This Cloud-Based Accounting System is designed for businesses in Nepal to automate and streamline financial operations, including invoicing, tax filing, payroll, VAT calculations, and financial reporting. The system will be accessible from anywhere through a secure cloud-based platform.

The app will use **Next.js** for the frontend, **MongoDB, Express, and Node.js** as the backend, **ShadCN** for UI components, and **Tailwind CSS** for styling.

### **Goals**
- Secure, scalable, and user-friendly accounting solution.
- **Real-time** transaction tracking.
- **Role-based access control (RBAC)** for different user types.
- Performance and security optimization.
- Compliance with Nepal's tax laws, including VAT and income tax.
- Intuitive interfaces for business owners, accountants, and finance teams.
- Detailed financial reports for decision-making.

### **Target Users**
- **Business Owners**: Small and medium-sized businesses (SMBs), startups, and enterprises.
- **Accountants/Bookkeepers**: Professionals managing accounting services.
- **Employees**: Users handling payroll and expenses.
- **Tax Authorities**: Inland Revenue Department (IRD) of Nepal for compliance.

---

## 2. Core Functionality

### 2.1 User Roles and Permissions
- **Admin**: Full access to all features, user management, and system settings.
- **Accountant**: Can view and generate reports, manage financial data, and handle tax filings.
- **Manager**: Access to department-specific financial data and reports.
- **Employee**: Limited access based on assigned permissions.
- **Google OAuth Support**: Allow users to log in using Google.
- **Secure Session Management**: Implement JWT-based authentication.

### 2.2 Core Features

#### 2.2.1 Dashboard
- **Overview**: Display financial summaries (balances, cash flow, VAT status, invoices, bills).
- **Customization**: Users can configure widgets based on their role.

#### 2.2.2 Invoicing and Billing
- **Invoice Creation**: Users can generate and send invoices.
- **Nepali Tax Support**: VAT (13%) calculation included.

#### 2.2.3 VAT and Tax Calculation & Reporting
- **Nepali VAT Compliance**: Automatic VAT calculation (13%).
- **Tax Reports**:
  - Sales Register
  - Sales Return Register
  - Purchase Register
  - Purchase Return Register
  - VAT Summary Report
  - TDS Report
  - Annex 13 Report
  - Annex 5 Materialized View Report

#### 2.2.4 Financial Management
- **General Ledger**: Track all accounting entries.
- **Accounts Payable/Receivable**: Manage unpaid bills and overdue invoices.
- **Expense Tracking**: Categorize and monitor expenses.

#### 2.2.5 Financial Reporting
- **Custom Reports**: Profit & Loss, Balance Sheet, Cash Flow Statement.
- **Tax Reports**: VAT filing, income tax returns, and compliance reports.

#### 2.2.6 Nepali Date System (Vikram Sambat)
- **Nepali Calendar Support**: Use Vikram Sambat alongside the Gregorian calendar.
- **Date Conversion**: Toggle between Gregorian and Nepali dates.

#### 2.2.7 Multi-User Collaboration
- **Real-Time Editing**: Multiple users can update financial data simultaneously.
- **Audit Trail**: Track all changes with user timestamps.

#### 2.2.8 Data Security
- **Encryption**: Secure data at rest and in transit.
- **Two-Factor Authentication (2FA)**: Additional login security.
- **Data Backup**: Automated cloud backups to prevent data loss.

### **Other Features**
- **Dark mode support**
- **Multi-currency support**
- **Notifications (email & in-app)**

---

## 3. Non-Functional Requirements

### 3.1 Performance
- **Scalability**: Must handle increasing users and transactions.
- **High Availability**: Ensure 99.9% uptime.
- **Fast Processing**: Generate reports in real-time.

### 3.2 Usability
- **Intuitive UI**: Minimal learning curve for new users.

### 3.3 Security
- **Data Protection**: Compliance with local and international standards (e.g., GDPR).
- **Backup & Recovery**: Regular backups and easy restoration.

---

## 4. API Endpoints & Documentation

### **Docs Structure**
- **Getting Started**
  - Setup Next.js with MongoDB, Express, and Node.js
  - Environment variables configuration
- **API Endpoints**
  - `POST /api/auth/login` → Handle authentication
  - `GET/POST /api/transactions` → Fetch/create transactions
  - `GET/POST /api/stock` → Manage stock ledger
  - `GET/POST /api/debtors-creditors` → Manage debtor/creditor data
- **Frontend Component Docs** (ShadCN usage examples)
- **Database Schema** (MongoDB collections and structure)

---

## 5. Tree Directory Structure
```markdown
cloud-accounting-app/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx  # Dashboard
│   │   ├── transactions.tsx  # Transactions list
│   │   ├── stock.tsx  # Stock ledger
│   │   ├── debtors-creditors.tsx  # Manage debtors/creditors
│   │   ├── reports.tsx  # Reports section
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
├── lib/
│   ├── db.ts  # MongoDB connection config
│   ├── utils.ts  # Helper functions
├── server/
│   ├── routes/
│   │   ├── auth.ts  # Authentication APIs
│   │   ├── transactions.ts  # Transactions API
│   │   ├── stock.ts  # Stock API
│   │   ├── debtors-creditors.ts  # Debtor/Creditor API
│   ├── models/
│   │   ├── User.ts
│   │   ├── Transaction.ts
│   │   ├── Stock.ts
│   │   ├── DebtorCreditor.ts
├── public/
│   ├── logo.png
│   ├── favicon.ico
├── styles/
│   ├── globals.css  # Tailwind styles
├── .env  # Environment variables
├── package.json
├── README.md
```

---

This structure minimizes files while maintaining clarity and efficiency for development. Any additional features can be implemented via third-party libraries as needed.

