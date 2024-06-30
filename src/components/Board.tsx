import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxDispatch';
import Card from './Card';
import { fetchCharactersAsync } from '../features/game/gameSlice';
import Scoreboard from './Scoreboard';

interface BoardProps {
  playerName1: string;
  playerName2: string;
}

const Board: React.FC<BoardProps> = ({ playerName1, playerName2 }) => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.game.characters);
  const [cards, setCards] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [turn, setTurn] = useState<number>(1);
  const [player1Pairs, setPlayer1Pairs] = useState<number>(0);
  const [player2Pairs, setPlayer2Pairs] = useState<number>(0);

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
    if (flippedCards.length === 2 || matchedCards.includes(id)) return;

    setFlippedCards((prev) => [...prev, id]);

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      const secondCard = cards[id];

      if (firstCard.name === secondCard.name) {
        setMatchedCards((prev) => [...prev, flippedCards[0], id]);
        
        if (turn === 1) {
          setPlayer1Pairs((prev) => prev + 1);
        } else {
          setPlayer2Pairs((prev) => prev + 1);
        }
      }

      setTimeout(() => {
        setFlippedCards([]);
        if (firstCard.name !== secondCard.name) {
          setTurn((prevTurn) => (prevTurn === 1 ? 2 : 1));
        }
      }, 1000);
    }
  };

  return (
    <div>
      <Scoreboard
        currentPlayer={turn === 1 ? playerName1 : playerName2}
        player1Pairs={player1Pairs}
        player2Pairs={player2Pairs}
        playerName1={playerName1}
        playerName2={playerName2}
      />
      <div className="grid grid-cols-8 gap-4 p-4">
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
      </div>
    </div>
  );
};

export default Board;
