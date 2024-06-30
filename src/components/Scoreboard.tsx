// components/Marcador.tsx

import React from "react";

interface MarcadorProps {
  currentPlayer: string;
  player1Pairs: number;
  player2Pairs: number;
}


const Scoreboard: React.FC<MarcadorProps> = ({ currentPlayer, player1Pairs, player2Pairs }) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
      <div className="mb-2 text-lg font-bold">Turno de: {currentPlayer}</div>
      <div className="flex justify-between">
        <div>
          <div className="text-sm font-bold">Jugador 1</div>
          <div>{player1Pairs} Pares adivinados</div>
        </div>
        <div>
          <div className="text-sm font-bold">Jugador 2</div>
          <div>{player2Pairs} Pares adivinados</div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
