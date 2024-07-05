import React from "react";

interface MarcadorProps {
  currentPlayer: string;
  player1Pairs: number;
  player2Pairs: number;
  playerName1 : string;
  playerName2 : string;
}


const Scoreboard: React.FC<MarcadorProps> = ({ currentPlayer, player1Pairs, player2Pairs, playerName1, playerName2 }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
      <div className="mb-2 text-lg font-bold">Turno de: {currentPlayer}</div>
      <div className="flex justify-between">
        <div>
          <div className="text-sm font-bold">{playerName1}</div>
          <div>{player1Pairs} Pares adivinados</div>
        </div>
        <div>
          <div className="text-sm font-bold">{playerName2}</div>
          <div>{player2Pairs} Pares adivinados</div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
