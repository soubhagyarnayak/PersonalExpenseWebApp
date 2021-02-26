import { ExpenseItem } from "./expenseItem";
import { ExpenseRepository } from "./expenseRepo";

export class ExpenseDb implements ExpenseRepository {
    getExpenseItem(expenseItemId: string): Promise<ExpenseItem> {
        throw new Error("Method not implemented.");
    }
    saveExpenseItem(expenseItem: ExpenseItem): Promise<ExpenseItem> {
        throw new Error("Method not implemented.");
    }
    getMonthlyExpenseItems(year: number, month: number): Promise<ExpenseItem[]> {
        throw new Error("Method not implemented.");
    }
    
}