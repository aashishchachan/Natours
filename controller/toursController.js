const Tour = require('./../models/tourModel')           

exports.getAllTours = (req,res) =>{   
    const {id} = req.params
    const tour = tours.find(el=> el.id === id)          
    res.status(200).json({
        status:'success',
        requested: req.requestTime,
        // results: tours.length,
        // data : {
        //     tour
        // }
    })  
};

exports.getTourById = (req, res) => {
    const { id } = req.params;
    // const tour = tours.find(el=> el.id === id)
    // res.status(200).json({
    //     status:'success',
    //     requested: req.requestTime,
    //     results: tours.length,
    //     data : {
    //         tour
    //     }
    // })  
};

exports.createTour = (req, res) =>{
    res.status(200).json({
        status:'success',
        requested: req.requestTime,
        results: tours.length,
        // data : {
        //     tours
        // }
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
