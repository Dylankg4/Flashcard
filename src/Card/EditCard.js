import React, {useState, useEffect} from "react"
import {Link, useParams, useHistory} from "react-router-dom"
import {updateCard, readDeck, readCard} from "../utils/api"

export default function EditCard(){
    const {deckId, cardId} = useParams()
    const [deck, setDeck] = useState({})
    const history = useHistory()
    const [card, setCard] = useState({
        front: '',
        back: '',
    });
    const initalFormData = {
        front: '',
        back: '',
    };
    const [formData, setFormData] = useState({ ...initalFormData });

    useEffect (()=> {
        const abortController = new AbortController()
        async function deckGet(){
            const deckRead = await readDeck(deckId, abortController.signal)
            setDeck(deckRead)
        }
        deckGet()
    },[])

    useEffect(() => {
        const ac = new AbortController();
        async function getCard(){
            const cardData = await readCard(cardId, ac.signal);
            setFormData({ ...cardData });
        }
        getCard();
    }, [deckId, cardId])

    async function handleSubmit(event){
        event.preventDefault();
        card.front = formData.front;
        card.back = formData.back;
        const abortController = new AbortController();
            async function updatedCardInit(){
                await updateCard(card, abortController.signal);
                setCard(card);
            }
            updatedCardInit();
            history.push(`/decks/${deckId}`);
    };

    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    if(!deck && !formData.back) {
        return <p>Loading</p>
    } else{
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
                </ol>
            </nav>
        <h2>Edit Card</h2>
        <label htmlFor="front">Name</label>
            <textarea 
                className="form-control" 
                id='front' 
                name='front'
                rows="2" 
                onChange={handleChange}
                value={formData.front}
            ></textarea>
        <label htmlFor="back">Description</label>
            <textarea 
                className="form-control" 
                id='back' 
                name='back'
                rows="2" 
                onChange={handleChange}
                value={formData.back}
            ></textarea>
        <Link to={`/decks/${deck.id}`}>
        <button>Cancel</button>
        </Link>
        <button onclick={handleSubmit}>Submit</button>
        </div>
    )
}
}