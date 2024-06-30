import React, { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import Board from "./components/Board";
import "./App.css";
const App: React.FC = () => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStartGame = (player1Name: string, player2Name: string) => {
    setPlayer1(player1Name);
    setPlayer2(player2Name);
  };

  return (
    <div className="bg-img">
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Memory Game</h1>
        {!player1 || !player2 ? (
          <PlayerForm onStartGame={handleStartGame} />
        ) : (
          <div>
            <Board
              playerName1={player1}
              playerName2={player2}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
