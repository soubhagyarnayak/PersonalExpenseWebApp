// tslint:disable:no-console
import Axios , {AxiosResponse, AxiosError} from 'axios';
import express = require('express')
import { read } from 'fs';
export const expenseRouter = express.Router()

/* GET expense page. */
expenseRouter.get('/:id', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const id = req.params.id
    Axios.get(`http://localhost:8080/expenses/${id}`)
    .then((response:AxiosResponse)=> {
        const expenseItem = response.data
        console.log(expenseItem)
        expenseItem.createtime = new Date(expenseItem.createtime)
        console.log(expenseItem)
        res.render('expense',{title: 'View expense item:', expenseItem});
      })
    .catch((error:AxiosError)=> {
        console.log(error);
        res.end();
      });
});

expenseRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render('new-expense', { title: 'Create expense item' });
});


/* Save an expense item. */
expenseRouter.post('/submit-expense', (req:express.Request, res:express.Response) => {
    const category = req.body.category
    const recipient = req.body.recipient
    const description = req.body.description
    const amount:number = req.body.amount
    const createtime:Date = req.body.date
    const tags = req.body.tags // req.body.tags.split(",")
    console.info(category);
    Axios.post('http://localhost:8080/expenses', {
        category,
        recipient,
        description,
        amount,
        createtime,
        tags
      })
      .then((response:AxiosResponse)=> {
        console.log(response);
      })
      .catch((error:AxiosError)=> {
        console.log(error);
      });
    res.end()
})