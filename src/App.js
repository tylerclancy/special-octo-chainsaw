import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import shuffle from './utilities/shuffle';
import Card from './components/Card.js';

function App() {
  const [cards, setCards] = useState(shuffle);


  return (
    <div className="App">
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;

          return (
            <Card
              key={id}
              image={image}
              selected={false}
              onClick={() => {}}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
