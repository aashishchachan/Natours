const express = require('express');
const app = express();
const morgan = require('morgan')

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next)=>{
    console.log('Hello from the middleware')
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;




