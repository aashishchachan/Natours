const fs = require('fs');

tours= JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val)=>{          //middleware function for paramas middleware
    const id = val *1;
    const tour = tours.find(el=> el.id === id)
    
    if(!tour){
        return res.status(404).json({
            status: 'fail', 
            message: 'Invalid ID'
        });
    }
    next();
}

exports.checkBody = (req, res, next)=>{             //middleware for createTour
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'invalid'    
        })
    }
    next();
}             

exports.getAllTours = (req,res) =>{             
    res.status(200).json({
        status:'success',
        requested: req.requestTime,
        results: tours.length,
        data : {
            tours
        }
    })  
};

exports.getTourById = (req,res) =>{
    res.status(200).json({
        status:'success',
        requested: req.requestTime,
        results: tours.length,
        data : {
            tour
        }
    })  
}

exports.createTour = (req, res) =>{
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

exports.updateTourById = (req, res)=>{
    res.status(200).json({
        status: 'success',
        requested: req.requestTime,
        results: tours.length,
        data: {
            tour: '<updated tour>'
        }
    })
}

exports.deleteTourById = (req, res)=>{
    res.status(204).json({
        status: 'success',
        requested: req.requestTime,
        results: tours.length,
        data: null
    })
}
