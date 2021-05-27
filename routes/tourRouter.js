const express = require('express');
const tourRouter = require('./../controller/toursController')

const router = express.Router();

router.route('/')
    .get(tourRouter.getAllTours)
    .post(tourRouter.createTour);

router.route('/:id')
    .get(tourRouter.getTourById)
    .patch(tourRouter.updateTourById)
    .delete(tourRouter.deleteTourById);

module.exports = router