const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carController = require('./controllers/controllers');

const app = express();
app.use(cors());
app.use(express.json());

// Connecting to database - add your own database link

const connectDB = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_DB);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectDB();

// Retrieves all of the car details
app.get('/get', carController.getCars)

// Adds a car to the database
app.post('/add', carController.addCar)

// Removes a car from database
app.delete('/delete/:id', carController.deleteCar)

// Edits the details of a specific car
app.put('/edit/:id', carController.editCar)

// Retrieves new owner name and all selected cars and changes the owner
app.post('/multiple', carController.editMulitpleOwners)

app.listen(4011, () => {
    console.log("Server is running")
})
