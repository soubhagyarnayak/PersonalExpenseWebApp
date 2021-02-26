// tslint:disable:no-console
import Axios , {AxiosResponse, AxiosError} from 'axios'
import { ExpenseItem } from './expenseItem'
import { ExpenseRepository } from './expenseRepo'

export class ExpenseServiceProxy implements ExpenseRepository{

    async getExpenseItem(expenseItemId: string):Promise<ExpenseItem>{
        let expenseItem
        try{
            const response = await Axios.get(`http://localhost:8080/expenses/${expenseItemId}`)
            expenseItem = response.data
            expenseItem.createtime = new Date(expenseItem.createtime)
        } catch(error){
            console.log(error)
            throw error
        }
        return expenseItem
    }

    async saveExpenseItem(expenseItem: ExpenseItem):Promise<ExpenseItem>{
        try{
            const response = await Axios.post('http://localhost:8080/expenses', {
                category:expenseItem.category,
                recipient:expenseItem.recipient,
                description:expenseItem.description,
                amount:expenseItem.amount,
                createtime:expenseItem.createtime,
                tags:expenseItem.tags
            })
            expenseItem = response.data
            expenseItem.createtime = new Date(expenseItem.createtime)
        }catch(error){
            console.log(error)
            throw error
        }
        return expenseItem
    }

    async getMonthlyExpenseItems(year: number, month: number): Promise<ExpenseItem[]> {
        let expenseItems:ExpenseItem[]
        try{
            const response = await Axios.get(`http://localhost:8080/expenses/${year}/${month}`)
            expenseItems = response.data
        } catch(error){
            console.log(error)
            throw error
        }
        return expenseItems
    }
}