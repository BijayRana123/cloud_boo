"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ShoppingCart,
  DollarSign,
  BarChart2,
  Package,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react"

// Helper function for class names if you don't have cn utility
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

interface SubNavItem {
  label: string
  href: string
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  isActive: boolean
  isCollapsed: boolean
  subItems?: SubNavItem[]
}

const NavItem = ({ icon, label, href, isActive, isCollapsed, subItems }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  if (!subItems) {
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-200 text-gray-700",
          isCollapsed ? "justify-center" : "",
        )}
      >
        <div className="text-lg">{icon}</div>
        {!isCollapsed && <span>{label}</span>}
      </Link>
    )
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive ? "bg-primary/10 text-primary" : "hover:bg-gray-200 text-gray-700",
          isCollapsed ? "justify-center" : "",
        )}
      >
        <div className="text-lg">{icon}</div>
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{label}</span>
            <ChevronRight
              size={16}
              className={cn(
                "transition-transform",
                isOpen ? "transform rotate-90" : ""
              )}
            />
          </>
        )}
      </button>
      {!isCollapsed && isOpen && (
        <div className="ml-8 space-y-1">
          {subItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "/dashboard" },
    // { icon: <Users size={20} />, label: "CRM", href: "/dashboard/crm" },
    // { icon: <Workflow size={20} />, label: "Workflow", href: "/dashboard/workflow" },
    { 
      icon: <DollarSign size={20} />, 
      label: "Sales", 
      href: "/dashboard/sales",
      subItems: [
        // { label: "Quotations", href: "/dashboard/sales/quotations" },
        { label: "Sales Return", href: "/dashboard/sales/sales_return" },
        { label: "Sales Voucher", href: "/dashboard/sales/sales_voucher" },
        // { label: "Credit Notes", href: "/dashboard/sales/credit-notes" },
        // { label: "Customer Payment", href: "/dashboard/sales/customer-payment" },
        // { label: "Customers", href: "/dashboard/sales/customers" },
        // { label: "Allocate Customer Payment", href: "/dashboard/sales/allocate-payment" }
      ]
    },
    { icon: <ShoppingCart size={20} />, label: "Purchase", href: "/dashboard/purchase",
    subItems: [
      // { label: "Quotations", href: "/dashboard/sales/quotations" },
      { label: "Purchase Return", href: "/dashboard/sales/purchase_return" },
      { label: "Purchase Voucher", href: "/dashboard/sales/purchse_voucher" },
     
    ] },
    { icon: <BarChart2 size={20} />, label: "Accounting", href: "/dashboard/accounting",
    subItems: [
        // { label: "Quotations", href: "/dashboard/sales/quotations" },
        { label: "Payment Voucher", href: "/dashboard/sales/payment_voucher" },
        { label: "Receipt Voucher", href: "/dashboard/sales/receipt_voucher" },
        { label: "Journal Voucher", href: "/dashboard/sales/journal_voucher" },
        { label: "Contra Voucher", href: "/dashboard/sales/contra_voucher" },
    ]
    },
    { icon: <Package size={20} />, label: "Inventory", href: "/dashboard/inventory",
    subItems: [
      {label: "Item", href: "/dashboard/inventory/item"},
      {label: "Item Group", href: "/dashboard/inventory/item_group"},
      {label: "Item Unit", href: "/dashboard/inventory/item_unit"},
    ] },
    { icon: <FileText size={20} />, label: "Reports", href: "/dashboard/reports" },
    { icon: <Settings size={20} />, label: "Configurations", href: "/dashboard/configurations" },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-gray-100 border-r border-gray-200 transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Create New Button */}
      <div className="p-3 relative">
        <button
          onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
          className={cn(
            "flex items-center gap-2 bg-green-500 text-white rounded-md w-full p-2 hover:bg-green-600 transition-colors",
            isCollapsed ? "justify-center" : "",
          )}
        >
          {isCreateMenuOpen ? <X size={20} /> : <Plus size={20} />}
          {!isCollapsed && <span>Create New</span>}
        </button>

        {/* Dropdown Menu */}
        {isCreateMenuOpen && !isCollapsed && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-10">
            {navItems.map((item) => 
              item.subItems?.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsCreateMenuOpen(false)}
                >
                  {subItem.label}
                </Link>
              ))
            ).filter(Boolean)}
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href || (item.subItems?.some(subItem => pathname === subItem.href))}
            isCollapsed={isCollapsed}
            subItems={item.subItems}
          />
        ))}
      </nav>

      {/* Toggle Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center w-full p-2 text-gray-600 bg-white rounded-md hover:bg-gray-200 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </button>
      </div>
    </div>
  )
}

