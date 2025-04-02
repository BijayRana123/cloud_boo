'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { FiSearch, FiHeadphones, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';
import { useClickOutside } from '@/hooks/useClickOutside';
import { calendarConverter } from '@/utils/calendarConverter';

const getInitials = (name: string = '') => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export default function Navbar() {
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [calendarFormat, setCalendarFormat] = useState<'AD' | 'BS'>('BS');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { data: session } = useSession();

  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dateDropdownRef, () => setIsDateDropdownOpen(false));
  useClickOutside(userDropdownRef, () => setIsUserDropdownOpen(false));

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' });
  };

  const formattedDate = calendarFormat === 'BS' 
    ? calendarConverter.formatBS(currentDate)
    : calendarConverter.formatAD(currentDate);

  const userInitials = getInitials(session?.user?.name || '');

  return (
    <nav className="bg-[#0A0B2C] text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left section - Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/dashboard" className="text-2xl font-bold">
              CloudBook
            </Link>

            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-[#1E1F45] rounded-md">
                <div className="pl-3">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-gray-400 px-3 py-2 w-64"
                />
                <div className="px-3 text-xs text-gray-400 border-l border-gray-600">
                  Ctrl + /
                </div>
              </div>
            </div>
          </div>

          {/* Right section - Support & Date Filter */}
          <div className="flex items-center space-x-6">
            {/* Support Link */}
            <Link href="/support" className="flex items-center space-x-2 text-sm hover:text-gray-300">
              <FiHeadphones className="h-5 w-5" />
              <span>Support</span>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </Link>

            {/* Date Filter Dropdown */}
            <div className="relative" ref={dateDropdownRef}>
              <button
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                className="flex items-center space-x-2 bg-[#1E1F45] px-4 py-2 rounded-md text-sm hover:bg-[#2A2B5A] transition-colors duration-200"
              >
                <FiCalendar className="h-4 w-4" />
                <span>This Fiscal Year to Date</span>
                <FiChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`absolute right-0 mt-2 w-56 bg-[#1E1F45] rounded-md shadow-lg py-1 z-50 transition-all duration-200 ${
                  isDateDropdownOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <div className="px-4 py-2 text-sm text-gray-300">
                  Current Date: {formattedDate}
                </div>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#2A2B5A] transition-colors duration-150">
                  This Month
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#2A2B5A] transition-colors duration-150">
                  Last Month
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#2A2B5A] transition-colors duration-150">
                  This Quarter
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#2A2B5A] transition-colors duration-150">
                  Last Quarter
                </a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-[#2A2B5A] transition-colors duration-150">
                  Custom Range
                </a>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#7CD4FD] flex items-center justify-center text-[#0A0B2C] font-medium text-sm">
                  {userInitials}
                </div>
              </button>

              <div
                className={`absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ${
                  isUserDropdownOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                {/* User Info */}
                <div className="px-4 py-3 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#7CD4FD] flex items-center justify-center text-[#0A0B2C] font-medium text-sm">
                      {userInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">
                        {session?.user?.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {session?.user?.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/help"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    Help
                  </Link>
                </div>

                {/* Calendar Format */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <div className="text-sm text-gray-500 mb-2">Calendar format</div>
                  <div className="flex space-x-2 bg-gray-50 p-1 rounded-md">
                    <button
                      onClick={() => setCalendarFormat('AD')}
                      className={`flex-1 text-sm px-3 py-1 rounded transition-all duration-200 ${
                        calendarFormat === 'AD'
                          ? 'bg-white shadow text-gray-900'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      AD
                    </button>
                    <button
                      onClick={() => setCalendarFormat('BS')}
                      className={`flex-1 text-sm px-3 py-1 rounded transition-all duration-200 ${
                        calendarFormat === 'BS'
                          ? 'bg-white shadow text-gray-900'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      BS
                    </button>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-150 border-t border-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 