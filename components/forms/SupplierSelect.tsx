"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface Supplier {
  name: string
  code: string
  address?: string
  pan?: string
  phone?: string
  group?: string
}

interface SupplierSelectProps {
  onSelect?: (supplier: Supplier) => void
  onSupplierSubmit?: (supplier: Supplier) => void
}

export default function SupplierSelect({ onSelect, onSupplierSubmit }: SupplierSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    address: "",
    code: "",
    pan: "",
    phone: "",
    group: "",
  })

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers')
      const data = await response.json()
      setSuppliers(data)
    } catch (error) {
      console.error('Error fetching suppliers:', error)
    }
  }

  const handleAddNewSupplier = async () => {
    try {
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSupplier)
      })

      if (!response.ok) throw new Error('Failed to create supplier')

      const supplier = await response.json()
      if (onSupplierSubmit) {
        onSupplierSubmit(supplier)
      } else {
        await fetchSuppliers() // Refresh the suppliers list
        if (onSelect) handleSelectSupplier(supplier)
      }
      setIsModalOpen(false)
      setIsOpen(false)
      setNewSupplier({ // Reset form
        name: "",
        address: "",
        code: "",
        pan: "",
        phone: "",
        group: "",
      })
    } catch (error) {
      console.error('Error creating supplier:', error)
      alert('Failed to create supplier')
    }
  }

  const handleSelectSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier)
    if (onSelect) onSelect(supplier)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedSupplier ? (
          <div className="flex justify-between items-center">
            <span>{selectedSupplier.name}</span>
            <span className="text-sm text-gray-500">{selectedSupplier.code}</span>
          </div>
        ) : (
          "Select Supplier"
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <div className="max-h-60 overflow-auto">
            {suppliers.map((supplier) => (
              <button
                key={supplier.code}
                className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-100"
                onClick={() => handleSelectSupplier(supplier)}
              >
                <span>{supplier.name}</span>
                <span className="text-sm text-gray-500">{supplier.code}</span>
              </button>
            ))}
            <button
              className="w-full border-t border-gray-200 px-4 py-2 text-left text-blue-600 hover:bg-gray-100"
              onClick={() => {
                setIsModalOpen(true)
                setIsOpen(false)
              }}
            >
              + Add New Supplier
            </button>
          </div>
        </div>
      )}

      {/* New Supplier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">New Supplier</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  value={newSupplier.name}
                  onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={newSupplier.address}
                  onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Code</label>
                  <input
                    type="text"
                    value={newSupplier.code}
                    onChange={(e) => setNewSupplier({ ...newSupplier, code: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PAN</label>
                  <input
                    type="text"
                    value={newSupplier.pan}
                    onChange={(e) => setNewSupplier({ ...newSupplier, pan: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    value={newSupplier.phone}
                    onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Group</label>
                  <input
                    type="text"
                    value={newSupplier.group}
                    onChange={(e) => setNewSupplier({ ...newSupplier, group: e.target.value })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleAddNewSupplier()}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}