import React from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Memory Game</h1>
      <Board />
    </div>
  );
}

export default App;
