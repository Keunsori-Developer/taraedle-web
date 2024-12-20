import React, { useEffect } from "react";
import { useState } from 'react';
import { Keyboard } from '../component/keyboard/Keyboard';
import { Grid } from '../component/grid/Grid';
import { CONFIG } from '../constant/config';
import { getQuiz, getQuizSetting, isWinngWord, wordInfo } from '../lib/words';
import { useTranslation } from 'react-i18next';
import { Alert } from '../component/popup/Alert';
import { ResultPopup } from "../component/popup/ResultPopup";
import * as Hangul from 'hangul-js'

const ALERT_TIME_MS = 2000

export const ProblemPage = () => {
  const [data, setData] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [guesses, setGuesses] = useState<string[][]>([])
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isNotMeaningful, setIsNotMeaningful] = useState(false);
  const [tries, setTries] = useState<number>(6);
  const [count, setCount] = useState<number>(6);
  const [info, setInfo] = useState<wordInfo>({
    id: '',
    value: '',
    length: 0,
    count: 0,
    definitions: [],
  });

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
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    const chkVal = Hangul.assemble(currentGuess);
    if (!Hangul.isComplete(chkVal)) {
      setIsNotMeaningful(true)
      return setTimeout(() => {
        setIsNotMeaningful(false)
      }, ALERT_TIME_MS);
    }

    const winningWord = isWinngWord(currentGuess.join(''))

    const setQuizSetting = () => {
      setTries(getQuiz().difficulty.maxAttempts);
      setCount(getQuiz().word.count);
    }

    if (currentGuess.length === CONFIG.wordLength && guesses.length < CONFIG.tries && !isGameWon) {      
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([]) 
      setInfo(getQuiz())

      if (winningWord) {
        // 데이터 전송 주석
        // exportResult(guesses.length + 1, true)
        return setIsGameWon(true)
      }
      
      if (guesses.length == CONFIG.tries - 1) {
        // 데이터 전송 주석
        // exportResult(CONFIG.tries - 1, false)
        return setIsGameLost(true)
      }
    }
  }


  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  return (
    <div>
      <Grid tries={tries } count={count} guesses={guesses} currentGuess={currentGuess}/>
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <Alert message={t('length is not enough')} isOpen={isNotEnoughLetters} variant="warning" />
      <Alert message={t('length is not meaningful')} isOpen={isNotMeaningful} variant="warning" />
      <ResultPopup isOpen={isGameWon} leftFunction={() => { window.location.href = '/' }} rightFunction={() => { window.location.href = '/problem' }} title="정답" info={info} lBtn="메인으로" rBtn="다른문제풀기"/>
      <ResultPopup isOpen={isGameLost} leftFunction={() => { window.location.href = '/' }} rightFunction={() => { window.location.href = '/problem' }} title="오답" info={info} lBtn="메인으로" rBtn="다른문제풀기"/>
    </div>
  );
}