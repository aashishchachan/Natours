const express = require('express');
// eslint-disable-next-line import/no-useless-path-segments
const tourController = require('./../controller/toursController')

const router = express.Router();

router.param('id', tourController.checkId);

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTourById)
    .patch(tourController.updateTourById)
    .delete(tourController.deleteTourById);

module.exports = router