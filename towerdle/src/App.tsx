import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { Keyboard } from './component/keyboard/Keyboard';
import { Grid } from './component/grid/Grid';
import { CONFIG } from './constant/config';
import { solution } from './lib/words';

function App() {
  const [data, setData] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [guesses, setGuesses] = useState<string[][]>([])
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)

  const dataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
  }

  const onChar = (value: string) => {
    if (currentGuess.length < CONFIG.wordLength && guesses.length < CONFIG.tries && !isGameWon) {
      let newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(currentGuess.length === CONFIG.wordLength)) {
      console.log('word length is not enough')
      return
    }
    const winningWord = currentGuess.join('')

    setGuesses([...guesses, currentGuess])
    setCurrentGuess([]) 
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  return (
    <div className="App">
      <Grid guesses={guesses} currentGuess={currentGuess}/>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      {/* {solution} */}
    </div>
  );
}

export default App;
