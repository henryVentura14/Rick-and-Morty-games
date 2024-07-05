// GameContextMock.tsx
import React, { ReactNode } from 'react';
import { GameContext, GameState, GameAction } from '../context/GameContext';

interface Props {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  children: ReactNode;
}

const GameProviderMock: React.FC<Props> = ({ state, dispatch, children }) => {
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProviderMock;
