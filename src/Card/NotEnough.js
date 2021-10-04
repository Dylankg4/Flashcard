import React from "react"
import {Link} from "react-router-dom"

export default function NotEnough({deck}){
return (
    <div>
    <h3>Not enough cards.</h3>
    <p>You need at least 3 cards to study. There are {deck.cards.length} cards in the deck.</p>
    <Link to={`/decks/${deck.id}/cards/new`}><button>Add Cards</button></Link>
    </div>
  )
}