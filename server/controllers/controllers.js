const carModel = require('../models/carModel');

// Gets all the cars from database
const getCars = (req, res) => {
    carModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

// Adds a car with details from user input
const addCar = async (req, res) => {
    const car = new carModel(req.body);
    try {
        await car.save();
        res.send(car);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// Deletes a specific car from database
const deleteCar = (req, res) => {
    const {id} = req.params;
    carModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

// Edits details of a specific car
const editCar = async (req, res) => {
    try {
        const {id} = req.params;
        const car = await carModel.findByIdAndUpdate(
            {_id: id}, req.body)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// Edits multiple cars with the details typed in by the user
const editMulitpleOwners = async (req, res) => {
    const newModel = req.body.model;
    const newMake = req.body.make;
    const newOwner = req.body.owner;
    const newReg = req.body.registration;
    const idArray = req.body.selected;

    try {
        // If the fields are left empty, that field wont be updated
        if (newModel != "") {
            const car = await carModel.updateMany(
                {_id: {$in: idArray}}, { $set: {model: newModel}}
            )
        }

        if (newMake != "") {
            const car = await carModel.updateMany(
                {_id: {$in: idArray}}, { $set: {make: newMake}}
            )
        }

        if (newOwner != "") {
            const car = await carModel.updateMany(
                {_id: {$in: idArray}}, { $set: {owner: newOwner}}
            )
        }

        if (newReg != "") {
            const car = await carModel.updateMany(
                {_id: {$in: idArray}}, { $set: {registration: newReg}}
            )
        }

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = {
    getCars,
    addCar,
    deleteCar,
    editCar,
    editMulitpleOwners
}