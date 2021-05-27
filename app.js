const express = require('express');
const app = express();
const fs= require('fs');
const morgan = require('morgan')
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next)=>{
    console.log('Hello from the middleware')
    req.requestTime = new Date().toISOString();
})

tours= JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllUsers = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message : 'not yet defined'
    })
}

const getUserById = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message : 'not yet defined'
    })
}

const createUser = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message : 'not yet defined'
    })
}

const updateUserById = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message : 'not yet defined'
    })
}

const deleteUserById = (req, res)=>{
    res.status(500).json({
        status: 'error',
        message : 'not yet defined'
    })
}


const getAllTours = (req,res) =>{
    res.status(200).json({
        status:'success',
        requested: req.requestTime,
        results: tours.length,
        data : {
            tours
        }
    })  
};

const getTourById = (req,res) =>{
    const id = req.params.id *1;
    const tour = tours.find(el=> el.id === id)
    
    if(!tour){
        return res.status(404).json({
            status: 'fail', 
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status:'success',
        requested: req.requestTime,
        results: tours.length,
        data : {
            tour
        }
    })  
}

const createTour = (req, res) =>{
    const id = tours[tours.length -1].id +1;
    const tour = Object.assign({id}, req.body);
    tours.push(tour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(200).json({
            status:'success',
            requested: req.requestTime,
            results: tours.length,
            data : {
                tours
            }
        })  
    })   
}

const updateTourById = (req, res)=>{
    const id = req.params.id *1;
    const tour = tours.find(el=> el.id === id)
    
    if(!tour){
        return res.status(404).json({
            status: 'fail', 
            message: 'Invalid ID'
        });
    }
    res.status(200).json({
        status: 'success',
        requested: req.requestTime,
        results: tours.length,
        data: {
            tour: '<updated tour>'
        }
    })
}

const deleteTourById = (req, res)=>{
    const id = req.params.id *1;
    const tour = tours.find(el=> el.id === id)
    
    if(!tour){
        return res.status(404).json({
            status: 'fail', 
            message: 'Invalid ID'
        });
    }
    res.status(204).json({
        status: 'success',
        requested: req.requestTime,
        results: tours.length,
        data: null
    })
}

const tourRouter = express.Router();
const userRouter = express.Router();

app.route('/')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById);

app.route('/api/v1/users')
    .get(getAllUsers)
    .post(createUser);

app.route('/api/v1/users/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
    

app.listen(port, (req, res)=>{
    console.log(`listening at port ${port}`);
})

