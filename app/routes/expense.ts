import { ExpenseServiceProxy } from './expenseProxy'
import express = require('express')
import { ExpenseItem } from './expenseItem';
export const expenseRouter = express.Router()

/* GET expense page. */
expenseRouter.get('/:id', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const id = req.params.id
    try{
      const expenseItem = await new ExpenseServiceProxy().getExpenseItem(id)
      res.render('expense',{title: 'View expense item:', expenseItem});
    } catch(error){
      res.end()
    }
});

expenseRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render('new-expense', { title: 'Create expense item' });
});

/* Save an expense item. */
expenseRouter.post('/submit-expense', async(req:express.Request, res:express.Response) => {
    let expenseItem = new ExpenseItem(
      req.body.category, req.body.recipient, req.body.description,
      req.body.amount, req.body.date, req.body.tags)
    try{
      expenseItem = await new ExpenseServiceProxy().saveExpenseItem(expenseItem)
      res.render('expense',{title: 'View expense item:', expenseItem})
    } catch(error){
      res.end()
    }
})