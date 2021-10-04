import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {createDeck} from "../utils/api"

export default function CreateDeck(){
    const history = useHistory();
    const initialFormData = {
        name: "",
        description: "",
    };
    const [formData, setFormData] = useState({ ...initialFormData });

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
          const abortController = new AbortController();
        async function addDeck(){
            const newDeck = await createDeck(formData, abortController.signal);
            setFormData({ ...initialFormData });
            history.push(`/decks/${newDeck.id}`);
        }
        addDeck();        
    };

    
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <div className="col">
                <p>Name</p>
                <label>
                    <input
                            className="form-control" 
                            id="name" 
                            name='name'
                            rows="3" 
                            placeholder='Deck Name'
                            onChange={handleChange}
                            value={formData.name}
                        ></input>
                </label>
                <p>Description</p>
                <label>
                    <textarea 
                            className="form-control" 
                            id="description" 
                            name='description'
                            rows="3" 
                            placeholder='Brief description of the deck'
                            onChange={handleChange}
                            value={formData.description}
                        ></textarea>
                </label>
            </div>
                <button className="btn btn-secondary mr-1">Cancel</button>
                <button className='btn btn-primary' onClick={handleSubmit}>
                        Submit
                    </button>
        </div>

  )
}