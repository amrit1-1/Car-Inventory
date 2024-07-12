import React, { useState, useEffect } from 'react';
import Create from './Create';
import axios from 'axios';
import remove from './images/remove.png';
import edit from './images/edit.png';

// This function houses most of the apps elements which controls and manages the cars in the database after the user has added them 
function Home () {

    // State to store the car data from database
    const [carData, setCarData] = useState([]);

    // States to control the visability of various fields
    const [oldCarVisability, setOldCarVisability] = useState(false);
    const [updateVisability, setUpdateVisability] = useState(false);
    const [editMulitple, setEditMulitple] = useState(false);

    // States to store the edited details for the user to update a car
    const [editModel, setEditModel] = useState("");
    const [editMake, setEditMake] = useState("");
    const [editOwner, setEditOwner] = useState("");
    const [editRegistration, setEditRegistration] = useState("");
    const [editId, setEditId] = useState("");

    // State to store edited owner details to change multiple entries
    const [editMultiModel, setEditMultiModel] = useState("");
    const [editMultiMake, setEditMultiMake] = useState("");
    const [editMultiOwner, setEditMultiOwner] = useState("");
    const [editMultiReg, setEditMultiReg] = useState("");

    // State to store array of selected cars ids
    const [selected, setSelected] = useState([]);

    // Hook to retrieve the cars from the database which updates every time the carData array changes
    useEffect(() => {
        axios.get('https://car-inventory-backend.onrender.com/get')
        .then(result => setCarData(result.data))
        .catch(err => console.log(err))
    }, [carData])

    // Removes the car from database based on its id
    const handleRemove = (id) => {
        axios.delete(`https://car-inventory-backend.onrender.com/delete/${id}`)
    }

    // This function sets the states with the original car details to initially fill the input fields before the user alters the details
    const handleEdit = (id, make, model, owner, registration) => {
        setUpdateVisability(true);
        setEditModel(model);
        setEditMake(make);
        setEditOwner(owner);
        setEditRegistration(registration);
        setEditId(id);
    }

    // This updates the individual chosen car entry with its new, edited details
    const handleUpdate = () => {
        axios.put(`https://car-inventory-backend.onrender.com/edit/${editId}`, {
            model: editModel, 
            make: editMake, 
            owner: editOwner, 
            registration: editRegistration
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
        setUpdateVisability(false);
    }

    // This filters the array to show only the cars older than 5 years
    const fileredCars = carData.filter(car => car.model < 2020);

    // This element contains the input fields that are only shown when the edit button is clicked
    const editElement = () => {
        return ( 
            <div className='input-box'>
                <label className='label'>Model</label>
                <input
                value = {editModel}
                type="number"
                min="1900"
                max="2025"
                className='input-field'
                onChange={(e) => setEditModel(e.target.value)} />
                
                <br />
                            
                <label className='label'>Make</label>
                <input 
                value = {editMake}
                type="text" 
                className='input-field' 
                onChange={(e) => setEditMake(e.target.value)} />
                            
                <br />
                            
                <label className='label'>Owner</label>
                <input 
                value = {editOwner}
                type="text" 
                className='input-field' 
                onChange={(e) => setEditOwner(e.target.value)} />
                            
                <br />
                            
                <label className='label'>Registration</label>
                <input 
                value = {editRegistration}
                type="text" 
                className='input-field' 
                onChange={(e) => setEditRegistration(e.target.value)} />
                            
                <br />
                            
                <button 
                type="button" 
                className='button' 
                onClick={() => handleUpdate()}>Update</button>

                <button 
                type="button" 
                className='button2' 
                onClick={() => setUpdateVisability(false)}>Back</button>
            </div>
        )
    }

    // This element returns the input field and instructions for user to edit multiple car owners
    const editMulti = () => {
        return (
            <>
                <p>Enter the new details, then select which cars you want to change and click 'Update Selected'.</p>
                <p>If a field is left empty, the original information in that field will remain unchanged.</p>

                <label className='label'>Model</label>
                <input 
                value = {editMultiModel}
                type="number" 
                min="1900"
                max="2025"
                className='input-field' 
                onChange={(e) => setEditMultiModel(e.target.value)} />

                <br />

                <label className='label'>Make</label>
                <input 
                value = {editMultiMake}
                type="text" 
                className='input-field' 
                onChange={(e) => setEditMultiMake(e.target.value)} />

                <br />

                <label className='label'>Owner</label>
                <input 
                value = {editMultiOwner}
                type="text" 
                className='input-field' 
                onChange={(e) => setEditMultiOwner(e.target.value)} />

                <br />

                <label className='label'>Registration</label>
                <input 
                value = {editMultiReg}
                type="text" 
                className='input-field' 
                onChange={(e) => setEditMultiReg(e.target.value)} />

                <br />

                <button 
                type="button" 
                className='button' 
                onClick={handleUpdatedSelected}>Update Selected</button>

                <button 
                type="button" 
                className='button2' 
                onClick={() => setEditMulitple(false)}>Back</button>
            </>
        )
    }

    // This function handles the select button for each car which sends its id to an array
    const handleSelect = (id) => {
        setSelected([...selected, id]);
    }

    // This function handles the deselect button for each car which removes its id from the array
    const handleDeselect = (id) => {
        setSelected(selected.filter(car => car !== id));
    }

    // This function sends the array of selected car ids as well as the new owner name and updates the cars
    const handleUpdatedSelected = () => {
        axios.post(`https://car-inventory-backend.onrender.com/multiple`, {
            model: editMultiModel,
            make: editMultiMake,
            owner: editMultiOwner,
            registration: editMultiReg,
            selected: selected
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
        // Then it resets everything back to initial values
        setEditMulitple(false);
        setSelected([]);
        setEditMake("");
        setEditMultiModel("");
        setEditMultiOwner("");
        setEditMultiReg("");
    }

    return (
        <>
        <h2>Car Inventory</h2>
        <Create />
        {/* Conditional rendering that shows a message if no cars are in the database yet*/}
        {
            (carData.length === 0) ?
            <h3>No data to show - try entering your car details above</h3> 
            : (oldCarVisability === true) ? 
            <>
                <ul className='car-list'>
                    <h3>Cars Older Than 5 Years</h3>

                    {(editMulitple === true) ?
                        editMulti(): null}

                    {(updateVisability === true) ? 
                        editElement(): null}

                    {fileredCars.map(car => (
                    <>
                        <li className='car-items'>
                            <p className='bold-text'>{car.model} {car.make}</p>
                            <p>Current Owner: {car.owner}</p>
                            <p>REG: {car.registration}</p>
                            {(editMulitple === true) ? 
                            <>
                                { /* Conditional rendering that checks if the cars id is already in the 'selected' array and displays
                                the appropriate button */
                                (selected.includes(car._id) === true) ? 
                                <button className='deselect' onClick={() => handleDeselect(car._id)}>Deselect</button>
                                : <button className='select' onClick={() => handleSelect(car._id)}>Select</button>}
                            </>
                            :
                            <>
                            <img className="remove" src={remove} onClick={() => handleRemove(car._id)}/>
                            <img className="edit" src={edit} onClick={() => handleEdit(car._id, car.make, car.model, car.owner, car.registration)}/>
                            </>
                            }
                        </li>
                    </>
                    ))}
                </ul>
                <button className="button" onClick={() => setOldCarVisability(false)}>Show All Cars</button>
                <button className='button2' onClick={() => setEditMulitple(true)}>Change Multiple Details</button>
            </>
            :
            <>
                <ul className='car-list'>
                    <h3>All Cars</h3>

                    {(editMulitple === true) ?
                        editMulti(): null}

                    {(updateVisability === true) ? 
                        editElement(): null}

                    {/* Maps the array of car data to the page */}
                    {carData.map(car => (
                        <li className='car-items'>
                            <p className='bold-text'>{car.model} {car.make}</p>
                            <p>Current Owner: {car.owner}</p>
                            <p>REG: {car.registration}</p>
                            {(editMulitple === true) ? 
                            <>
                                {(selected.includes(car._id) === true) ? 
                                <button className='deselect' onClick={() => handleDeselect(car._id)}>Deselect</button>
                                : <button className='select' onClick={() => handleSelect(car._id)}>Select</button>}
                            </>
                            :
                            <>
                            <img className="remove" src={remove} onClick={() => handleRemove(car._id)}/>
                            <img className="edit" src={edit} onClick={() => handleEdit(car._id, car.make, car.model, car.owner, car.registration)}/>
                            </>
                            }
                        </li>
                    ))}
                </ul>
                {/* Filters the array to shw only the cars older than 5 years */}
                <button className="button" onClick={() => setOldCarVisability(true)}>Show Cars Older Than 5 Years</button>
                <button className='button2' onClick={() => setEditMulitple(true)}>Change Mulitple Details</button>
            </>
        }
        </>
    )
}

export default Home;
