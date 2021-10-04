import React, {useState, useEffect} from "react"
import {Link, useRouteMatch} from "react-router-dom"
import {readDeck} from "../utils/api"
import CardFlip from "../Card/CardFlip"
import NotEnough from "../Card/NotEnough"


export default function Study(){
  const [deck, setDeck] = useState([]);
  const [cardIndex, setCardIndex] = useState(0)
  const {params} = useRouteMatch()

  
    useEffect (()=> {
        const abortController = new AbortController()
        async function fetchCards(){
            const card = await readDeck(params.deckId, abortController.signal)
            setDeck(card)
        }
        fetchCards()
    },[])
    

    if(deck.length === 0){
      return <p>loading...</p>
    }else if (deck){
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="#">{deck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
        <div>{deck.cards.length > 2?
        <div>
        <h1>Study: Card {cardIndex +1} of {deck.cards.length}</h1>
        <div className="card">
          <h3>Card</h3>
            <CardFlip deck={deck} cardIndex={cardIndex} setCardIndex={setCardIndex}/>
            </div>
          </div> : <NotEnough deck ={deck}/>
          }
          </div>
      </div>
    )
    } else{
      return <p>Failed to render...</p>
    }
}