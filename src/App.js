import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';

import shuffle from './utilities/shuffle';
import Card from './components/Card.js';
import Header from './components/Header.js';

import useAppBadge from './hooks/useAppBadge.js';

function App() {
  const [cards, setCards] = useState(shuffle); // Cards array from assets.
  const [pickOne, setPickOne] = useState(null); // User's first selection.
  const [pickTwo, setPickTwo] = useState(null); // User's second selection.
  const [disabled, setDisabled] = useState(null); // Delay between selections.
  const [wins, setWins] = useState(0);

  const [setBadge, clearBadge] = useAppBadge(); // Handle app badge.

  function handleClick(card) {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  }

  function handleTurn() {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  }

  // Restart the game.
  function handleNewGame() {
    clearBadge();
    setWins(0);
    handleTurn();
    setCards(shuffle);
  }

  // Use for card selection and handling matches.
  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked.
    if (pickOne && pickTwo) {
      // Check if cards match.
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to show match.
              return { ...card, matched: true };
            } else {
              // No match.
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay.
        setDisabled(true);

        // Add delay between selections.
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    // Teardown logic.
    return () => {
      clearTimeout(pickTimer);
    };

  }, [cards, pickOne, pickTwo]);

  // If user has found all matches.
  useEffect(() => {

    // Check for any remaining card matches.
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win count.
    if (cards.length && checkWin.length < 1) {
      console.log('You win!');
      setWins(wins + 1);
      handleTurn();
      setBadge();
      setCards(shuffle);
    }
  }, [cards, wins]);


  return (
    <div className="App">
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
