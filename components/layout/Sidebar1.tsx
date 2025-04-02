"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Workflow,
  ShoppingCart,
  DollarSign,
  BarChart2,
  Package,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"

// Helper function for class names if you don't have cn utility
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  href: string
  isActive: boolean
  isCollapsed: boolean
}

const NavItem = ({ icon, label, href, isActive, isCollapsed }: NavItemProps) => {
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

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "/dashboard" },
    { icon: <Users size={20} />, label: "CRM", href: "/dashboard/crm" },
    { icon: <Workflow size={20} />, label: "Workflow", href: "/dashboard/workflow" },
    { icon: <DollarSign size={20} />, label: "Sales", href: "/dashboard/sales" },
    { icon: <ShoppingCart size={20} />, label: "Purchase", href: "/dashboard/purchase" },
    { icon: <BarChart2 size={20} />, label: "Accounting", href: "/dashboard/accounting" },
    { icon: <Package size={20} />, label: "Inventory", href: "/dashboard/inventory" },
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
      <div className="p-3">
        <button
          className={cn(
            "flex items-center gap-2 bg-green-500 text-white rounded-md w-full p-2 hover:bg-green-600 transition-colors",
            isCollapsed ? "justify-center" : "",
          )}
        >
          <Plus size={20} />
          {!isCollapsed && <span>Create New</span>}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-3 space-y-1">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
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

