import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { Keyboard } from './component/keyboard/Keyboard';
import { EmptyRow } from './component/grid/EmptyRow';
import { Grid } from './component/grid/Grid';

function App() {
  const [data, setData] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [guesses, setGuesses] = useState<string[][]>([])
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])

  const dataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
  }

  const getData = async () => {

  }

  return (
    <div className="App">
      <Grid guesses={guesses} currentGuess={currentGuess}/>
      <Keyboard
        onChar={(value: string) => { }}
        onDelete={() => { }}
        onEnter={() => { }}
        guesses={guesses}
      />
    </div>
  );
}

export default App;
