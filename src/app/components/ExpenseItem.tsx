import { Expense } from '@/app/types'

type Props = {
  expense: Expense
  onEdit: (e: Expense) => void
  onDelete: (id: string) => void
}

export default function ExpenseItem({ expense, onEdit, onDelete }: Props) {
  return (
    <li className="flex justify-between items-center border-b pb-2">
      <div>
        <strong>{expense.title}</strong> - {expense.amount.toLocaleString()} đ
        <br />
        <small>{expense.date}</small>
      </div>
      <div className="space-x-2">
        <button className="text-blue-600" onClick={() => onEdit(expense)}>Sửa</button>
        <button className="text-red-600" onClick={() => onDelete(expense.id)}>Xoá</button>
      </div>
    </li>
  )
}
