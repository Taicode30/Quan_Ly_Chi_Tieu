'use client'

import { useState, useEffect } from 'react'
import { Expense } from '@/app/types'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  onAdd: (e: Expense) => void
  onUpdate: (e: Expense) => void
  editing: Expense | null
}

export default function ExpenseForm({ onAdd, onUpdate, editing }: Props) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    if (editing) {
      setTitle(editing.title)
      setAmount(editing.amount.toString())
      setDate(editing.date)
    }
  }, [editing])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(amount)
    if (!title || isNaN(amt)) return

    const exp: Expense = {
      id: editing ? editing.id : uuidv4(),
      title,
      amount: amt,
      date: date || new Date().toISOString().split('T')[0]
    }

    editing ? onUpdate(exp) : onAdd(exp)

    setTitle('')
    setAmount('')
    setDate('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <input type="text" className="border p-2 flex-1" placeholder="Tên khoản chi"
        value={title} onChange={e => setTitle(e.target.value)} />
      <input type="number" className="border p-2 w-28" placeholder="Số tiền"
        value={amount} onChange={e => setAmount(e.target.value)} />
      <input type="date" className="border p-2 w-36"
        value={date} onChange={e => setDate(e.target.value)} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editing ? 'Cập nhật' : 'Thêm'}
      </button>
    </form>
  )
}