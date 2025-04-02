"use client"

import type React from "react"
import { Plus, List, FileText, Users, CreditCard, Package, FileSpreadsheet, BarChart } from "lucide-react"

interface QuickLinkProps {
  title: string
  category: string
  icon: React.ReactNode
  iconType?: "plus" | "list"
}

const QuickLinkCard = ({ title, category, icon, iconType = "plus" }: QuickLinkProps) => {
  return (
    <div className="bg-white p-4 rounded-md border border-gray-200 flex items-start justify-between">
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
      <div className="text-green-500">
        {iconType === "plus" ? <Plus size={20} /> : iconType === "list" ? <List size={20} /> : icon}
      </div>
    </div>
  )
}

export default function QuickLinks() {
  const quickLinks = [
    { title: "Tasks", category: "Sales", icon: <Plus size={20} />, iconType: "plus" },
    { title: "Customer Payment", category: "Sales", icon: <CreditCard size={20} />, iconType: "plus" },
    { title: "Customers", category: "Sales", icon: <Users size={20} />, iconType: "plus" },
    { title: "Quotations", category: "Sales", icon: <FileText size={20} />, iconType: "plus" },
    { title: "Contact Group", category: "CRM", icon: <Users size={20} />, iconType: "list" },
    { title: "Leads", category: "CRM", icon: <Users size={20} />, iconType: "plus" },
    { title: "Units Of Measurement", category: "Inventory", icon: <Package size={20} />, iconType: "list" },
    { title: "Debit Notes", category: "Purchase", icon: <FileSpreadsheet size={20} />, iconType: "list" },
    { title: "Purchase Order", category: "Purchase", icon: <FileText size={20} />, iconType: "list" },
    { title: "Journal report", category: "Reports", icon: <BarChart size={20} />, iconType: "list" },
    { title: "Allocate Customer Payments", category: "Sales", icon: <CreditCard size={20} />, iconType: "list" },
  ]

  return (
    <div className="bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Quick Links</h2>
        <button className="text-blue-600 hover:text-blue-800">Edit Links</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickLinks.map((link, index) => (
          <QuickLinkCard
            key={index}
            title={link.title}
            category={link.category}
            icon={link.icon}
            iconType={link.iconType}
          />
        ))}
      </div>

      {/* <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-gray-200 text-center">
          <span className="font-medium">Sales</span>
        </div>
        <div className="bg-white p-4 rounded-md border border-gray-200 text-center">
          <span className="font-medium">Purchase</span>
        </div>
        <div className="bg-white p-4 rounded-md border border-gray-200 text-center">
          <span className="font-medium">Receipt</span>
        </div>
        <div className="bg-white p-4 rounded-md border border-gray-200 text-center">
          <span className="font-medium">Payment</span>
        </div>
      </div> */}
    </div>
  )
}

