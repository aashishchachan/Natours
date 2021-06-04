const Tour = require('./../models/tourModel')           

exports.getAllTours = async (req,res) =>{   
    try {
        // building query

        //filtering
        const queryObj = { ...req.query };
        const excludeFields = ['limit', 'sort', 'page', 'fields'];
        excludeFields.forEach(field => delete queryObj[field]);

        //advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, el => `$${el}`);
        console.log(JSON.parse(queryStr));

        let query = Tour.find(JSON.parse(queryStr));

        //sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);
            query = query.sort(sortBy) // sort(price duration ...)
        } else {
            query = query.sort('-createdAt') // '-' is for descending order
        }

        //executing query
        const tours = await query;
        
        res.status(200).json({
            status:'success',
            requested: req.requestTime,
            results: tours.length,
            data : {
                tours
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            messsage: err
        });
    }
};

exports.getTourById = async (req, res) => {
    try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        requested: req.requestTime,
        data: {
          tour
        }
    });
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            messsage: err,
        });
    }  
};

exports.createTour = async (req, res) => {
    try {
    const newTour = await Tour.create(req.body)
    res.status(200).json({
        status: 'success',
        requested: req.requestTime,
        data: {
            newTour
        }
    });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }     
}

exports.updateTourById = async (req, res)=>{
    try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        status: 'success',
        requested: req.requestTime,
        data: {
        tour,
        },
    })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            messsage: err,
        });
    }
}

exports.deleteTourById = async (req, res)=>{
    try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status: 'success',
        requested: req.requestTime,
      });
    } catch (err) {
        res.status(404).json({    
            status: 'failed',
            messsage: err,
        });
    }
}
