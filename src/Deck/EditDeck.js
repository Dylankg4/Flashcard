import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link} from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';

export const EditDeck = () => {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const initalFormData = {
        name: '',
        description: '',
    };
    const [formData, setFormData] = useState({ ...initalFormData });
    useEffect(() => {
        const ac = new AbortController();
        async function getDeck(){
            const deck = await readDeck(deckId, ac.signal);
            setDeck(deck);
            setFormData({
                name: deck.name,
                description: deck.description,
            });
        }
        getDeck();
    }, [deckId])
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };
    const handleCancel = () => {
        history.push(`/decks/${deckId}`);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        deck.name = formData.name;
        deck.description = formData.description;
        const abortController = new AbortController();
            async function updatedDeck(){
                await updateDeck(deck, abortController.signal);
                setDeck(deck);
            }
            updatedDeck();
            history.push(`/decks/${deckId}`);
    };
    if (!deck) {
        return 'Loading...';
    } else {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>
                                <span className='oi oi-home mr-2'></span>
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/decks/${deckId}`}>
                                Deck {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                    </ol>
                </nav>
                <h2>Edit Deck</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <textarea 
                            className="form-control" 
                            id='name' 
                            name='name'
                            rows="3" 
                            onChange={handleChange}
                            value={formData.name}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            className="form-control" 
                            id='description' 
                            name='description'
                            rows="3" 
                            onChange={handleChange}
                            value={formData.description}
                        ></textarea>
                    </div>
                    <button className='btn btn-secondary' onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className='btn btn-primary' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </>
        );
    }
};

export default EditDeck;