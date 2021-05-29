const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name must be there'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, 'A price must be there']
    }
});

const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour

