"use client"

import { useState, useEffect } from 'react'
import NepaliDate from 'nepali-date-converter'

interface NepaliDatePickerProps {
  value: string
  onChange: (date: string) => void
  onClose: () => void
}

export default function NepaliDatePicker({ value, onChange, onClose }: NepaliDatePickerProps) {
  const [currentNepaliDate, setCurrentNepaliDate] = useState<NepaliDate>()
  const [selectedYear, setSelectedYear] = useState<number>()
  const [selectedMonth, setSelectedMonth] = useState<number>()
  
  useEffect(() => {
    const [year, month] = value.split('-').map(Number)
    const nepDate = new NepaliDate(year, month - 1, 1)
    setCurrentNepaliDate(nepDate)
    setSelectedYear(year)
    setSelectedMonth(month - 1)
  }, [value])

  const months = [
    'Baisakh', 'Jestha', 'Ashadh', 'Shrawan',
    'Bhadra', 'Ashwin', 'Kartik', 'Mangsir',
    'Poush', 'Magh', 'Falgun', 'Chaitra'
  ]

  const getDaysInMonth = (year: number, month: number) => {
    // Nepali calendar month days (1-12 months)
    const nepaliMonthDays = [
      31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30
    ]
    return nepaliMonthDays[month]
  }

  const handleDateSelect = (day: number) => {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    onChange(dateStr)
    onClose()
  }

  if (!currentNepaliDate || selectedYear === undefined || selectedMonth === undefined) {
    return null
  }

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <div className="flex justify-between mb-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className="text-center text-sm font-medium py-1">{day}</div>
          ))}
          {days.map(day => (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              className="p-2 text-center hover:bg-gray-100 rounded"
            >
              {day}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}