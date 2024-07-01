import React, { useState } from "react";

interface FormularioProps {
  onStartGame: (player1: string, player2: string) => void;
}

const PayerForm: React.FC<FormularioProps> = ({ onStartGame }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStartGame = () => {
    if (player1.trim() === "" || player2.trim() === "") {
      alert("Por favor introduce el nombre de ambos jugadores.");
      return;
    }

    onStartGame(player1, player2);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Memory Game Setup</h2>
      <div className="mb-4">
        <label htmlFor="player1" className="block text-gray-700 font-bold mb-2">
          Player 1:
        </label>
        <input
          type="text"
          id="player1"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={player1}
          placeholder="Henry"
          onChange={(e) => setPlayer1(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="player2" className="block text-gray-700 font-bold mb-2">
          Player 2:
        </label>
        <input
          type="text"
          id="player2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={player2}
          placeholder="Jahaziel"
          onChange={(e) => setPlayer2(e.target.value)}
        />
      </div>
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleStartGame}
      >
        Start Game
      </button>
    </div>
  );
};

export default PayerForm;
