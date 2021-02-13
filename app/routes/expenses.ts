// tslint:disable:no-console
import Axios , {AxiosResponse, AxiosError} from 'axios';
import express = require('express')
export const expensesRouter = express.Router()

expensesRouter.get('/monthly', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const date = new Date()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const label = date.toLocaleString('default', { month: 'long' }) +" "+ year;
    Axios.get(`http://localhost:8080/expenses/${year}/${month}`)
    .then((response:AxiosResponse)=>{
        const expenseItems = response.data
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
        expenseItems.sort((x: { createtime: number; },y: { createtime: number; })=>{
            return x.createtime-y.createtime
        })
        const expenditureLabels = Array()
        const expenditureData = Array()
        for (const key of expenditureMap.keys()) {
            expenditureLabels.push(key)
            expenditureData.push(expenditureMap.get(key))
        }
        res.render('monthly-expense',
          {title: 'Monthly Expense', label, total, totalInvestments, totalExpenditures, expenseItems:response.data, expenditureLabels, expenditureData},
        )
    })
    .catch((error:AxiosError)=>{
        console.log(error)
        res.end()
    })
});
