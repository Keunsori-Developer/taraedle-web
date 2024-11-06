import React from "react";
import { useState, useEffect } from 'react';
import { Keyboard } from '../component/keyboard/Keyboard';
import { Grid } from '../component/grid/Grid';
import { CONFIG } from '../constant/config';
import { solution, isWinngWord, exportResult } from '../lib/words';
import { useTranslation } from 'react-i18next';
import { Alert } from '../component/alerts/Alert';
import { Button } from "@headlessui/react";

const ALERT_TIME_MS = 2000

export const ProblemPage = () => {
    const [data, setData] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [guesses, setGuesses] = useState<string[][]>([])
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)

  const { t } = useTranslation()

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
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }
    const winningWord = isWinngWord(currentGuess.join(''))

    if (currentGuess.length === CONFIG.wordLength && guesses.length < CONFIG.tries && !isGameWon) {      
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([]) 

      if (winningWord) {
        exportResult(guesses.length + 1, true)
        return setIsGameWon(true)
      }

      if (guesses.length == CONFIG.tries - 1) {
        exportResult(CONFIG.tries - 1, false)
        return setIsGameLost(true)
      }
    }
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


      <Alert message={t('length is not enough')} isOpen={isNotEnoughLetters} />
      <Alert message={t('game lose')} isOpen={isGameLost} />
      <Alert message={t('game win')} isOpen={isGameWon}/>
    </div>
  );
}