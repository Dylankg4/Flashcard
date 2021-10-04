import React, {useState} from "react"
import {useHistory} from "react-router-dom"

export default function CardFlip({deck, cardIndex, setCardIndex}){
  const history = useHistory()
    const [flip, setFlip] = useState(true)

    const backSideClick=()=>{
      console.log(cardIndex, deck.cards.length)
        if(cardIndex +1 === deck.cards.length){
          if(window.confirm("Restart Deck?")){
            setCardIndex(0)
          } else{
            history.goBack()
          }
        } else{
          setCardIndex((current)=> current + 1)
          setFlip(true)
        }
      }

    const flipped = () =>{
        if(flip) {
          setFlip(false)
        }else {
          setFlip(true)
        }
      }
    return(
        <div>
            {flip? 
            <div>
            <p>{deck.cards[cardIndex].front}</p>
            <button onClick={flipped}>flip</button></div>: 
            <div><p>{deck.cards[cardIndex].back}</p>
            <button onClick={flipped}>flip</button><button onClick={()=>backSideClick()}>Next</button></div>
            }
            </div>
    )
}