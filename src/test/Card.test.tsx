import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card';

test('Card component renders correctly', () => {
  const cardProps = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    flipped: false,
    onClick: jest.fn(),
  };

  render(<Card {...cardProps} />);
  const cardElement = screen.getByAltText('Rick Sanchez');
  expect(cardElement).toBeInTheDocument();
});

test('Card component handles click', () => {
  const handleClick = jest.fn();
  const cardProps = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    flipped: false,
    onClick: handleClick,
  };

  render(<Card {...cardProps} />);
  const cardElement = screen.getByAltText('Rick Sanchez');
  fireEvent.click(cardElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
