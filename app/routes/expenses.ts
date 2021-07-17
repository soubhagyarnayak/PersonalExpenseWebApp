import express = require('express')
import { ExpenseServiceProxy } from './expenseProxy';
export const expensesRouter = express.Router()

expensesRouter.get('/monthly', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const date = new Date()
    renderMonthlyExpenses(res,date)
});

expensesRouter.get('/year/:year/month/:month', async(req:express.Request, res:express.Response, next:express.NextFunction) =>{
    const date = new Date(Number(req.params.year), Number(req.params.month))
    await renderMonthlyExpenses(res,date)
});

async function renderMonthlyExpenses(res: express.Response, date:Date){
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const label = date.toLocaleString('default', { month: 'long' }) +" "+ year;
    try{
        const expenseItems = await new ExpenseServiceProxy().getMonthlyExpenseItems(year,month)
        let total = 0
        let totalInvestments = 0
        let totalExpenditures = 0
        const expenditureMap = new Map()
        expenseItems.forEach((expenseItem: { createtime: string | number | Date; amount: number; category: string; }) => {
            expenseItem.createtime = new Date(expenseItem.createtime)
            total += expenseItem.amount
            if(expenseItem.category==='Investment'){
                totalInvestments += expenseItem.amount
            } else {
                totalExpenditures += expenseItem.amount
                if(expenditureMap.has(expenseItem.category)){
                    const oldValue = expenditureMap.get(expenseItem.category)
                    expenditureMap.set(expenseItem.category, oldValue+expenseItem.amount)
                } else {
                    expenditureMap.set(expenseItem.category, expenseItem.amount)
                }
            }
        });
        expenseItems.sort((x,y)=>{
            return x.createtime.getUTCDate() -y.createtime.getUTCDate()
        })
        const expenditureLabels = Array()
        const expenditureData = Array()
        for (const key of expenditureMap.keys()) {
            expenditureLabels.push(key)
            expenditureData.push(expenditureMap.get(key))
        }
        res.render('monthly-expense',
          {title: 'Monthly Expense', label, total, totalInvestments, totalExpenditures, expenseItems, expenditureLabels, expenditureData},
        )
    } catch(error){
        res.end()
    }
}