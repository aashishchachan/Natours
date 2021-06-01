const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name must be there'],
        unique: true,
        trim: true,
    },
    duration: {
        type: Number,
        required: [true, 'A durations must be there'],
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A maxGroupSize must be there'],
    },
    difficulty: {
        type: String,
        required: [true, 'A difficulty must be there'],
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
    },
    ratingsQuantity: {
        type: Number,
        defalut: 0,
    },
    price: {
        type: Number,
        required: [true, 'A price must be there'],
    },
    priceDiscount: {
        type: Number,
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A summary must be there']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'An image cover must be there']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date]
    
});

const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour

