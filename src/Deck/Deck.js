import React, {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck ,deleteDeck, deleteCard} from "../utils/api"

export default function Deck(){
    const {deckId} = useParams()
    const history = useHistory()
    const [deck, setDeck] = useState([])

    useEffect (()=> {
        const abortController = new AbortController()
        async function deckGet(){
            const deckRead = await readDeck(deckId, abortController.signal)
            setDeck(deckRead)
            console.log(deck)
        }
        deckGet()
    },[deckId])

    function deleteDecks(deckId) {
        const ac = new AbortController()
        if (window.confirm("Delete entire deck?")) {
          deleteDeck(deckId, ac.signal);
          history.push("/")
          history.go(0)
        }
      }
      function deleteCards(cardId) {
        const ac = new AbortController()
        if (window.confirm("Delete this card?")) {
          deleteCard(cardId, ac.signal);
          history.go(0)
        }
      }

    function cards(){
        return deck.cards.map((card,index) =>{
            return (
            <div key={index} className="card-body">
                <p>{card.front}</p>
                <p>{card.back}</p>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                <button className="btn btn-secondary">Edit</button>
                </Link>
                <button className="btn btn-danger" onClick={()=>deleteCards(card.id)}><span className="oi oi-trash"></span></button>
            </div>
            )
        })
    }
    if(deck.length===0){
        return <p>Loading</p>
    } else if (1===1){
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div>
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <Link to={`/decks/${deck.id}/edit`}>
                <button className="btn btn-secondary">Edit</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                <button className="btn btn-primary">Study</button>
                </Link>
                <Link to={`/decks/${deck.id}/cards/new`}>
                <button className="btn btn-primary">Add Cards</button>
                </Link>
                <button className="btn btn-danger" onClick={()=>deleteDecks(deckId)}><span className="oi oi-trash"></span></button>
            </div>
            <div>
                <h3>Cards</h3>
                {deck.cards.length? 
                <div className="card" style={{width: "18rem"}}>
                {cards()}
                </div>
                : <p>No Cards</p> }
            </div>
        </div>
        )
    } else{
        return <p>failed to render</p>
    }
}