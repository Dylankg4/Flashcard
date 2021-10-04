import React, {useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {listDecks, deleteDeck} from "../utils/api"

export default function Home(){
    const history = useHistory()
    const [decks, setDecks] = useState([]);
    useEffect (()=> {
        const abortController = new AbortController()
        async function fetchDecks(){
            const deck = await listDecks(abortController.signal)
            setDecks(deck)
            console.log(deck)
        }
        fetchDecks()
    },[])

    function handleDelete(deckId) {
        const ac = new AbortController()
        if (window.confirm("Are you sure?")) {
          deleteDeck(deckId, ac.signal);
          history.go(0)
        }
      }

    //creates idividual decks
    const deckMap = decks.map((deck, index) => {
        return( <div key={index} className="card">
            <div className="title">
                <h4>{deck.name}</h4>
                <p>{deck.cards.length} cards</p>
            </div>
                <p>{deck.description}</p>
                <div>
                    <Link to={`/decks/${deck.id}`}>
                        <button className="btn btn-secondary">
                            <span className="oi oi-eye" ></span>
                            View
                        </button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                        <button className="btn btn-primary">Study</button>
                    </Link>
                        <button className="btn btn-danger" onClick={()=>handleDelete(deck.id)}>
                            <span className="oi oi-trash"></span>
                        </button>
                </div>
            </div> )
    })

    

    return(
        <div>
            <div className="actions">
                <Link to="/decks/new">
                <button className="btn btn-secondary">
                    <span className="oi oi-plus mr-1"></span>
                    Create Deck
                </button>
                </Link>
            </div>
            
            {deckMap}
            
        </div>
    )
}