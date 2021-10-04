import React,{useState, useEffect} from "react"
import {Link, useParams, useHistory} from "react-router-dom"
import {readDeck, createCard} from "../utils/api"

export default function AddCard(){
    const history = useHistory()
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({
        front: '',
        back: '',
    });
    const {deckId} = useParams()

    const initialFormData = {
        front: "",
        back: ""
    }
    const [formData, setFormData] = useState({ ...initialFormData });

    useEffect (()=> {
        const abortController = new AbortController()
        async function deckGet(){
            const deckRead = await readDeck(deckId, abortController.signal)
            console.log(deck)
            setDeck(deckRead)
        }
        deckGet()
    },[deckId])

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleDone = () => {
        history.push(`/decks/${deckId}`);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        card.front = formData.front;
        card.back = formData.back;
        const abortController = new AbortController();
        async function addCard(){
            await createCard(deckId, card, abortController.signal);
            setCard(card);
        }
        addCard();
        setFormData({ ...initialFormData });
        history.go(0)
    };

    if (!card && !deck && formData.back === undefined) {
        return 'Loading...';
    } else {
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <p>Front</p>
            <textarea 
                className="form-control" 
                id='name' 
                name='name'
                rows="2"
                placeholder="Front of card"
                onChange={handleChange}
            ></textarea>
            <p>Back</p>
            <textarea 
                className="form-control" 
                id='name' 
                name='name'
                rows="2"
                placeholder="Back of card"
                onChange={handleChange}
            ></textarea>
            <button onClick={handleDone}>Done</button>
            <button onClick={handleSubmit}>Save</button>
        </div>
    )
}
}