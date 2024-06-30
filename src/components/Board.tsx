import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxDispatch';
import Card from './Card';
import { fetchCharactersAsync } from '../features/game/gameSlice';

interface BoardProps {
  gridSize: number;
  currentPlayer: string;
}

const Board: React.FC<BoardProps> = ({ gridSize, currentPlayer }) => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.game.characters);
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchCharactersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (characters.length) {
      const doubledCharacters = [...characters, ...characters];
      const shuffledCards = doubledCharacters
        .sort(() => Math.random() - 0.5)
        .map((char, index) => ({ ...char, id: index }));
      setCards(shuffledCards);
    }
  }, [characters]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;

    setFlippedCards((prev) => [...prev, id]);

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      const secondCard = cards[id];

      if (firstCard.name === secondCard.name) {
        setMatchedCards((prev) => [...prev, flippedCards[0], id]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };
  console.log(gridSize, cards, flippedCards, matchedCards, currentPlayer);
  return (
    <div className={`grid grid-cols-${gridSize} gap-4 p-4`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          name={card.name}
          image={card.image}
          flipped={flippedCards.includes(card.id) || matchedCards.includes(card.id)}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
      <div className="mt-4">
        <p>Current Player: {currentPlayer}</p>
        <p>Matched Pairs: {matchedCards.length / 2}</p>
      </div>
    </div>
  );
};

export default Board;
