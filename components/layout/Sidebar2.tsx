"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
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

interface CategoryItem {
  label: string
  items: {
    label: string
    href: string
  }[]
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
            <ChevronRight size={16} className={cn("transition-transform", isOpen ? "transform rotate-90" : "")} />
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
  const popupRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsCreateMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Store previous collapse state
  const [prevCollapsedState, setPrevCollapsedState] = useState(false)

  // Collapse sidebar when opening create menu, restore when closing
  useEffect(() => {
    if (isCreateMenuOpen) {
      setPrevCollapsedState(isCollapsed)
      setIsCollapsed(true)
    } else if (!isCreateMenuOpen) {
      setIsCollapsed(prevCollapsedState)
    }
  }, [isCreateMenuOpen])

  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "/dashboard" },
    {
      icon: <DollarSign size={20} />,
      label: "Sales",
      href: "/dashboard/sales",
      subItems: [
        { label: "Sales Return", href: "/dashboard/sales/sales_return" },
        { label: "Sales Voucher", href: "/dashboard/sales/sales_voucher" },
      ],
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Purchase",
      href: "/dashboard/purchase",
      subItems: [
        { label: "Purchase Return", href: "/dashboard/purchase/purchase_return" },
        { label: "Purchase Voucher", href: "/dashboard/purchase/purchase_voucher" },
      ],
    },
    {
      icon: <BarChart2 size={20} />,
      label: "Accounting",
      href: "/dashboard/accounting",
      subItems: [
        { label: "Payment Voucher", href: "/dashboard/accounting/payment_voucher" },
        { label: "Receipt Voucher", href: "/dashboard/accounting/receipt_voucher" },
        { label: "Journal Voucher", href: "/dashboard/accounting/journal_voucher" },
        { label: "Contra Voucher", href: "/dashboard/accounting/contra_voucher" },
      ],
    },
    {
      icon: <Package size={20} />,
      label: "Inventory",
      href: "/dashboard/inventory",
      subItems: [
        { label: "Item", href: "/dashboard/inventory/item" },
        { label: "Item Group", href: "/dashboard/inventory/item_group" },
        { label: "Item Unit", href: "/dashboard/inventory/item_unit" },
      ],
    },
    { icon: <FileText size={20} />, label: "Reports", href: "/dashboard/reports" },
    { icon: <Settings size={20} />, label: "Configurations", href: "/dashboard/configurations" },
  ]

  // Organize menu items by category
  const categories: CategoryItem[] = [
    {
      label: "GENERAL",
      items: [
        { label: "Customer", href: "/dashboard/general/customer" },
        { label: "Supplier", href: "/dashboard/general/supplier" },
        { label: "Products", href: "/dashboard/general/products" },
        { label: "Accounts", href: "/dashboard/general/accounts" },
        // { label: "Accounts Group", href: "/dashboard/general/accounts-group" },
      ],
    },
    {
      label: "SALES",
      items: [
        // { label: "Quotation", href: "/dashboard/sales/quotation" },
        { label: "Sales Voucher", href: "/dashboard/sales/sales_voucher" },
        { label: "Sales Return", href: "/dashboard/sales/sales_return" },
        // { label: "Customer Payment", href: "/dashboard/sales/customer-payment" },
        // { label: "Credit Note", href: "/dashboard/sales/credit-note" },
      ],
    },
    {
      label: "PURCHASE",
      items: [
        { label: "Purchase Voucher", href: "/dashboard/purchase/purchase_voucher" },
        { label: "Purchase Return", href: "/dashboard/purchase/purchase_return" },
        // { label: "Expenses", href: "/dashboard/purchase/expenses" },
        // { label: "Supplier Payment", href: "/dashboard/purchase/supplier-payment" },
        // { label: "Debit Note", href: "/dashboard/purchase/debit-note" },
      ],
    },
    {
      label: "ACCOUNTING",
      items: [
        { label: "Journal Voucher", href: "/dashboard/accounting/journal-voucher" },
        { label: "Contra Voucher", href: "/dashboard/accounting/contra_voucher" },
        { label: "Payment Voucher", href: "/dashboard/accounting/payment_voucher" },
        { label: "Receipt Voucher", href: "/dashboard/accounting/receipt_voucher" },
      ],
    },
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
          ref={buttonRef}
          onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
          className={cn(
            "flex items-center gap-2 bg-green-500 text-white rounded-md w-full p-2 hover:bg-green-600 transition-colors",
            isCollapsed ? "justify-center" : "",
          )}
        >
          {isCreateMenuOpen ? <X size={20} /> : <Plus size={20} />}
          {!isCollapsed && <span>Create New</span>}
        </button>

        {/* Popup Menu */}
        {isCreateMenuOpen && (
          <div
            ref={popupRef}
            className="fixed left-16 bg-white rounded-md shadow-lg border border-gray-200 z-50 flex"
            style={{
              top: "80px", // Position lower on the page
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
            }}
          >
            <button
              className="absolute top-2 left-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsCreateMenuOpen(false)}
            >
              <X size={20} />
            </button>

            <div className="flex flex-wrap p-4 gap-8 pt-10">
              {categories.map((category, index) => (
                <div key={index} className="min-w-[200px]">
                  <h3 className="font-medium text-gray-800 mb-4">{category.label}</h3>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <span className="text-gray-400 mr-2">+</span>
                        <Link
                          href={item.href}
                          className="text-gray-700 hover:text-blue-600"
                          onClick={() => setIsCreateMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
            isActive={pathname === item.href || item.subItems?.some((subItem) => pathname === subItem.href)}
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

