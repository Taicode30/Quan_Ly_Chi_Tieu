'use client'

import { useEffect, useState } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import { Expense } from './types'
import { v4 as uuidv4 } from 'uuid'

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [editing, setEditing] = useState<Expense | null>(null)

  useEffect(() => {
    const data = localStorage.getItem('expenses')
    if (data) setExpenses(JSON.parse(data))
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (e: Expense) => setExpenses([e, ...expenses])
  const updateExpense = (e: Expense) => {
    setExpenses(expenses.map(x => x.id === e.id ? e : x))
    setEditing(null)
  }
  const deleteExpense = (id: string) => setExpenses(expenses.filter(x => x.id !== id))

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <main className="max-w-xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-center mb-4">Quản lý chi tiêu</h1>
      <ExpenseForm
        onAdd={addExpense}
        onUpdate={updateExpense}
        editing={editing}
      />
      <h2 className="mt-4 font-semibold text-lg">Tổng chi: {total.toLocaleString()} đ</h2>
      <ExpenseList
        expenses={expenses}
        onEdit={setEditing}
        onDelete={deleteExpense}
      />
    </main>
  )
}
