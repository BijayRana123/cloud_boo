"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import SupplierSelect from "./SupplierSelect"
import { calendarConverter } from "@/utils/calendarConverter"
import NepaliDate from "nepali-date-converter"
import NepaliDatePicker from "./NepaliDatePicker"
import { TransactionType, PaymentStatus } from "@/server/models/Transaction"

interface PurchaseVoucherFormProps {
  isOpen: boolean
  onClose: () => void
}

interface Supplier {
  name: string
  code: string
}

interface Item {
  product: string
  qty: number
  rate: number
  discount: number
  tax: number
  amount: number
}

export default function PurchaseVoucherForm({ isOpen, onClose }: PurchaseVoucherFormProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [billNumber, setBillNumber] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [nepaliDate, setNepaliDate] = useState(calendarConverter.toBS(new Date()))
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [formData, setFormData] = useState({
    supplierInvoiceRef: '',
    items: [{ product: '', qty: 0, rate: 0, discount: 0, tax: 0, amount: 0 }] as Item[]
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Fetch last transaction count for bill number generation
    const fetchBillNumber = async () => {
      try {
        const response = await fetch('/api/transactions/count')
        const data = await response.json()
        const nextNumber = (data.count + 1).toString().padStart(4, '0')
        setBillNumber(`BILL-${nextNumber}`)
      } catch (error) {
        console.error('Error fetching bill number:', error)
      }
    }
    fetchBillNumber()
  }, [])

  useEffect(() => {
    // Convert selected date to Nepali date
    const nepDate = calendarConverter.toBS(selectedDate)
    setNepaliDate(nepDate)
  }, [selectedDate])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields

  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...formData.items] as Item[]
    newItems[index] = { ...newItems[index], [field]: value } as Item
    
    // Calculate amount
    if (field === 'qty' || field === 'rate' || field === 'discount' || field === 'tax') {
      const item = newItems[index]
      const subtotal = Number(item.qty) * Number(item.rate)
      const discountAmount = (subtotal * Number(item.discount)) / 100
      const taxAmount = ((subtotal - discountAmount) * Number(item.tax)) / 100
      item.amount = subtotal - discountAmount + taxAmount
    }

    setFormData({ ...formData, items: newItems })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-6xl h-[90vh] flex relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <div className="absolute top-4 left-4">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Purchase Bill</h2>
        </div>

        <div className="flex w-full mt-16">
          {/* Left Side - Image Upload */}
          <div className="w-1/3 p-6 border-r border-gray-200">
            <div
              className="h-[400px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500">Click to upload image</p>
                  <p className="text-sm text-gray-400">or drag and drop</p>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-2/3 p-6 overflow-y-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Supplier Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Supplier Name *</label>
                <SupplierSelect
                  onSelect={(supplier) => setSelectedSupplier(supplier)}
                />
              </div>

              {/* Bill Details */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bill Number</label>
                  <input
                    type="text"
                    value={billNumber}
                    readOnly
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bill Date (BS) *</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={nepaliDate}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 cursor-pointer"
                      onClick={() => setShowDatePicker(true)}
                    />
                  </div>
                  {showDatePicker && (
                    <NepaliDatePicker
                      value={nepaliDate}
                      onChange={(date) => {
                        setNepaliDate(date)
                        setSelectedDate(calendarConverter.toAD(date))
                        setShowDatePicker(false)
                      }}
                      onClose={() => setShowDatePicker(false)}
                    />
                  )}
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Supplier Invoice Reference No</label>
                <input
                  type="text"
                  placeholder="Reference"
                  value={formData.supplierInvoiceRef}
                  onChange={(e) => setFormData({ ...formData, supplierInvoiceRef: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              {/* Products Table */}
              <div className="mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product / service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tax</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            placeholder="Add Code or Product"
                            value={item.product}
                            onChange={(e) => handleItemChange(index, 'product', e.target.value)}
                            className="w-full border-0 focus:ring-0"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={item.qty || ''}
                            onChange={(e) => handleItemChange(index, 'qty', Number(e.target.value))}
                            className="w-20 border-0 focus:ring-0"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={item.rate || ''}
                            onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value))}
                            className="w-20 border-0 focus:ring-0"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={item.discount || ''}
                            onChange={(e) => handleItemChange(index, 'discount', Number(e.target.value))}
                            className="w-20 border-0 focus:ring-0"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={item.tax || ''}
                            onChange={(e) => handleItemChange(index, 'tax', Number(e.target.value))}
                            className="w-20 border-0 focus:ring-0"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={item.amount || ''}
                            className="w-20 border-0 focus:ring-0"
                            readOnly
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Additional Cost Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  + Add Additional Cost
                </button>
              </div>

              {/* Save Button */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}