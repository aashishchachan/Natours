const express = require('express');
const app = express();
const fs= require('fs');
const port = 3000;

app.use(express.json());

tours= JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req,res) =>{
    res.status(200)
    .json({
        status:'success',
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
    res.status(200)
    .json({
        status:'success',
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
        res.status(200)
        .json({
            status:'success',
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
        data: null
    })
}

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTourById);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTourById);
// app.delete('/api/v1/tours/:id', deleteTourById);

app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getTourById)
    .patch(updateTourById)
    .delete(deleteTourById);



app.listen(port, (req, res)=>{
    console.log(`listening at port ${port}`);
})

