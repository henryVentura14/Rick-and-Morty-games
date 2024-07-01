// src/App.tsx
import React, {useState} from 'react';
import { GameProvider } from './context/GameContext';
import Board from './components/Board/Board';
import PlayerForm from './components/PlayerForm/PlayerForm';

const App: React.FC = () => {
  const [players, setPlayers] = useState<{ player1: string; player2: string } | null>(null);

  const handleStartGame = (player1: string, player2: string) => {
    setPlayers({ player1, player2 });
  };

  return (
    <GameProvider>
      <div className="App">
        {players ? (
          <Board playerName1={players.player1} playerName2={players.player2} />
        ) : (
          <PlayerForm onStartGame={handleStartGame} />
        )}
      </div>
    </GameProvider>
  );
};

export default App;
