import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import shuffle from './utilities/shuffle';
import Card from './components/Card.js';

function App() {
  const [cards, setCards] = useState(shuffle); // Cards array from assets.
  const [pickOne, setPickOne] = useState(null); // User's first selection.
  const [pickTwo, setPickTwo] = useState(null); // User's second selection.
  const [disabled, setDisabled] = useState(null); // Delay between selections.
  const [wins, setWins] = useState(0);

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


  return (
    <div className="App">
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
