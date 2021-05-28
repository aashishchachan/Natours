const express = require('express');
const morgan = require('morgan')

const app = express();

const tourRouter = require('./routes/tourRouter');
const userRouter = require('./routes/userRouter');

if(process.env.NODE_ENV !== 'production'){          // process.env.<variables> is accessible once read in server.js
    app.use(morgan('dev'));
}
app.use(express.json());

app.use((req, res, next)=>{
    console.log('Hello from the middleware')
    req.requestTime = new Date().toISOString();
    next();
})

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;




