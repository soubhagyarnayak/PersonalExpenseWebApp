// tslint:disable:no-console
import Axios , {AxiosResponse, AxiosError} from 'axios';
import express = require('express')
export const expenseRouter = express.Router()

/* GET expense page. */
expenseRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render('expense', { title: 'New Expense' });
  });


/* Save an expense item. */
expenseRouter.post('/submit-expense', (req:express.Request, res:express.Response) => {
    const category = req.body.category
    const recipient = req.body.recipient
    const description = req.body.description
    const amount:number = req.body.amount
    console.info(category);
    Axios.post('http://localhost:8080/expenses', {
        category,
        recipient,
        description,
        amount
      })
      .then((response:AxiosResponse)=> {
        console.log(response);
      })
      .catch((error:AxiosError)=> {
        console.log(error);
      });
    res.end()
})