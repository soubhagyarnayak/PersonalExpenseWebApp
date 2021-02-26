import { ExpenseItem } from "./expenseItem";

export interface ExpenseRepository{
    getExpenseItem(expenseItemId: string):Promise<ExpenseItem>
    saveExpenseItem(expenseItem: ExpenseItem):Promise<ExpenseItem>
    getMonthlyExpenseItems(year: number, month: number):Promise<ExpenseItem[]>
}