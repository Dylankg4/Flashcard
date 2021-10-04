import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home"
import Study from "../Study"
import Deck from "../Deck/Deck"
import CreateDeck from "../Deck/CreateDeck"
import EditDeck from "../Deck/EditDeck"
import AddCard from "../Card/AddCard"
import EditCard from "../Card/EditCard"
import {Switch, Route} from "react-router-dom"

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard/>
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <AddCard/>
        </Route>
        <Route path ="/decks/:deckId/study">
          <Study/>
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck/>
        </Route>
        <Route exact path="/decks/new">
          <CreateDeck/>
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck/>
        </Route>
        <Route exact path ="/">
          <Home/>
        </Route>
        <Route>
          <NotFound />
        </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
