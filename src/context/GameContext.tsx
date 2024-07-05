import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Define types
export interface Character {
  id: number;
  name: string;
  image: string;
}

export interface GameState {
  characters: Character[];
  player1Pairs: number;
  player2Pairs: number;
  turn: number;
}

export type GameAction =
  | { type: 'SET_CHARACTERS'; payload: Character[] }
  | { type: 'ADD_PAIR'; payload: 'player1' | 'player2' }
  | { type: 'TOGGLE_TURN' };

export interface GameProviderProps {
  children: ReactNode;
}

const initialState: GameState = {
  characters: [],
  player1Pairs: 0,
  player2Pairs: 0,
  turn: 1,
};

// Create the context
export const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<GameAction> } | undefined>(undefined);

// Reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'SET_CHARACTERS':
      return { ...state, characters: action.payload };
    case 'ADD_PAIR':
      return {
        ...state,
        player1Pairs: action.payload === 'player1' ? state.player1Pairs + 1 : state.player1Pairs,
        player2Pairs: action.payload === 'player2' ? state.player2Pairs + 1 : state.player2Pairs,
      };
    case 'TOGGLE_TURN':
      return { ...state, turn: state.turn === 1 ? 2 : 1 };
    default:
      return state;
  }
};

// Provider component
export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const fetchCharactersAsync = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      dispatch({ type: 'SET_CHARACTERS', payload: data.results });
    };
    fetchCharactersAsync();
  }, []);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>;
};

// Custom hook to use the GameContext
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
