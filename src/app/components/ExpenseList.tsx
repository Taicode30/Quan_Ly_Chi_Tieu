import { Expense } from '@/app/types'
import ExpenseItem from './ExpenseItem'

type Props = {
  expenses: Expense[]
  onEdit: (e: Expense) => void
  onDelete: (id: string) => void
}

export default function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  return (
    <ul className="mt-4 space-y-2">
      {expenses.map(exp => (
        <ExpenseItem
          key={exp.id}
          expense={exp}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}