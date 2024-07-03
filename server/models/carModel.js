const mongoose  = require('mongoose');

// Initialises the schema
const carSchema = mongoose.Schema({
    model: Number,
    make: String,
    owner: String,
    registration: String
});

const carModel = mongoose.model('Car', carSchema);
module.exports = carModel;