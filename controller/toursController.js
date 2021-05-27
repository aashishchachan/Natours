const fs = require('fs');

tours= JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

exports.deleteTourById = (req, res)=>{
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
