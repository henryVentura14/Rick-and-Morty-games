import React, { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import Board from "./components/Board"; 
import Scoreboard from "./components/Scoreboard";

const App: React.FC = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gridSize, setGridSize] = useState(4);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [player1Pairs, setPlayer1Pairs] = useState(0);
  const [player2Pairs, setPlayer2Pairs] = useState(0);

  const handleStartGame = (player1Name: string, player2Name: string, size: number) => {
    setPlayer1(player1Name);
    setPlayer2(player2Name);
    setGridSize(size);
    setCurrentPlayer(player1Name);
    setPlayer1Pairs(0);
    setPlayer2Pairs(0);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Memory Game</h1>
      {!player1 || !player2 ? (
        <PlayerForm onStartGame={handleStartGame} />
      ) : (
        <div>
          <Scoreboard currentPlayer={currentPlayer} player1Pairs={player1Pairs} player2Pairs={player2Pairs} />
          <Board gridSize={gridSize} currentPlayer={currentPlayer} />
        </div>
      )}
    </div>
  );
};

export default App;
