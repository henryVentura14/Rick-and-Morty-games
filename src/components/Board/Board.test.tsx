// Board.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GameProviderMock from '../../mocks/GameContextMock';
import Board from './Board';

describe('Board component', () => {
  const initialState = {
    characters: [
      { id: 1, name: 'Rick', image: 'https://example.com/rick.png' },
      { id: 2, name: 'Morty', image: 'https://example.com/morty.png' },
    ],
    turn: 1,
    player1Pairs: 0,
    player2Pairs: 0,
  };

  const mockDispatch = jest.fn();

  const renderWithProvider = (component: any) => {
    return render(
      <GameProviderMock state={initialState} dispatch={mockDispatch}>
        {component}
      </GameProviderMock>
    );
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render Scoreboard and cards', () => {
    renderWithProvider(<Board playerName1="Henry" playerName2="Jahaziel" />);
    expect(screen.getByText('Turno de: Henry')).toBeInTheDocument();
    expect(screen.getAllByAltText('Rick').length).toBeGreaterThan(0);
    expect(screen.getAllByAltText('Morty').length).toBeGreaterThan(0);
  });

  it('should handle card click correctly', () => {
    renderWithProvider(<Board playerName1="Henry" playerName2="Jahaziel" />);

    const rickCards = screen.getAllByAltText('Rick');
    fireEvent.click(rickCards[0]);

    // eslint-disable-next-line testing-library/no-node-access
    expect(rickCards[0].parentElement?.parentElement).toHaveClass('rotate-y-180');
    expect(mockDispatch).not.toHaveBeenCalled();

    fireEvent.click(rickCards[1]);

    setTimeout(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'ADD_PAIR', payload: 'player1' });
    }, 1000);
  });
});
