import React, { useState} from 'react';
import axios from "axios";

// This function creates the car entries at the top of the web page
function Create () {

    // These states define the details of the car that will be retrieved from the input fields
    const [model, setModel] = useState("");
    const [make, setMake] = useState("");
    const [owner, setOwner] = useState("");
    const [registration, setRegistration] = useState("");

    // This links to my api and adds the car to the database
    const handleAdd = () => {
        axios.post("https://car-inventory-backend.onrender.com", {
            model: model, 
            make: make, 
            owner: owner, 
            registration: registration,
        })
        .then(result => console.log(result))
        .catch(err => console.log(err))
        // Empties the fields after submitting
        setModel("");
        setMake("");
        setOwner("");
        setRegistration("");
    }

    return (
        <div>
            <p>Enter your car details to add to the inventory</p>

            <div className='input-box'>
                <label className='label'>Model</label>
                <input 
                type="number"
                min="1900"
                max="2025"
                className='input-field'
                value={model}
                onChange={(e) => setModel(e.target.value)}></input>

                <br />

                <label className='label'>Make</label>
                <input 
                type="text" 
                className='input-field' 
                onChange={(e) => setMake(e.target.value)}
                value={make}></input>

                <br />

                <label className='label'>Owner</label>
                <input 
                type="text" 
                className='input-field' 
                onChange={(e) => setOwner(e.target.value)}
                value={owner}></input>

                <br />

                <label className='label'>Registration</label>
                <input 
                type="text" 
                className='input-field' 
                onChange={(e) => setRegistration(e.target.value)}
                value={registration}></input>

                <br />

                <button type="button" className='button' onClick={handleAdd}>Add</button>
            </div>

            <hr />
        </div>
    )
}

export default Create;
