// tslint:disable:no-console
import express = require('express')
export const expenseRouter = express.Router()

/* GET expense page. */
expenseRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render('expense', { title: 'New Expense' });
  });


/* Save an expense item. */
expenseRouter.post('/submit-expense', (req:express.Request, res:express.Response) => {
    const category = req.body.category
    console.info(category);
    // ...
    res.end()
})