import express = require('express');
export const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
  res.send('respond with a resource');
});
