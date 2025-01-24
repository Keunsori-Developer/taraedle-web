import React, { useEffect } from "react";
import { useState } from 'react';
import { Keyboard } from '../component/keyboard/Keyboard';
import { Grid } from '../component/grid/Grid';
import { CONFIG } from '../constant/config';
import { exportResult, getQuizSetting, isWinngWord, quizValue } from '../lib/words';
import { useTranslation } from 'react-i18next';
import { Alert } from '../component/modal/Alert';
import { ResultPopup } from "../component/modal/ResultPopup";
import * as Hangul from 'hangul-js'
import { isAvailableWord, quizSetting } from "../lib/wordFromWeb";
import { LevelPopUp } from "../component/modal/LevelPopUp";
import { createContext } from "vm";
import { Guide } from "../component/modal/Guide";
import { WordInfo, Meaning } from "../constant/type";
import { getStatistic } from "../lib/auth";

const ALERT_TIME_MS = 2000

const ProblemPage = () => {
  const [data, setData] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [guesses, setGuesses] = useState<string[][]>([])
  const [currentGuess, setCurrentGuess] = useState<Array<string>>([])
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isNotMeaningful, setIsNotMeaningful] = useState(false);
  const [tries, setTries] = useState<number>(getQuizSetting().tries);
  const [count, setCount] = useState<number>(getQuizSetting().count);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [info, setInfo] = useState<WordInfo>({
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
    if (currentGuess.length < quizValue.word.count && guesses.length < quizValue.difficulty.maxAttempts && !isGameWon) {
      let newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(currentGuess.length === quizValue.word.count)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    const chkVal = Hangul.assemble(currentGuess);
    if (!Hangul.isCompleteAll(chkVal)) {
      errMsgUp()
      return;
    }

    const winningWord = isWinngWord(currentGuess.join(''))
    isAvailableWord(currentGuess.join('')).then(() => {
      if (currentGuess.length === quizValue.word.count && guesses.length < quizValue.difficulty.maxAttempts && !isGameWon) {      
        setGuesses([...guesses, currentGuess])
        setCurrentGuess([]) 
        setInfo(quizValue.word)
        
        if (winningWord) {
          // 데이터 전송 주석
          exportResult(guesses.length + 1, true)
          // getStatistic();
          return setIsGameWon(true)
        }
        
        if (guesses.length == quizValue.difficulty.maxAttempts - 1) {
          // 데이터 전송 주석
          exportResult(quizValue.difficulty.maxAttempts - 1, false)
          // getStatistic();
          return setIsGameLost(true)
        }
      }
    }
    ).catch((error) => {
      errMsgUp()
      return;
    });

  }

  const errMsgUp = () => {
    setIsNotMeaningful(true)
      return setTimeout(() => {
        setIsNotMeaningful(false)
      }, ALERT_TIME_MS);
  }

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const goMainPage = () => {
    window.location.href = '/';
  }

  const goNextQuiz = () => {
    const difficulty = localStorage.getItem('difficulty');
    if (difficulty) {
      quizSetting(difficulty);
    }
  }

  const popupHandler = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="fit">
      {/* <button onClick={popupHandler}>난이도 변경</button> */}
      <div style={{width: '100%', marginTop: '1rem', textAlign: 'right'}}>
        <button className="gameGuide" onClick={popupHandler}>?</button>
      </div>
      <div>
        <Grid tries={tries } count={count} guesses={guesses} currentGuess={currentGuess}/>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
        />
      </div>
      <Alert message={t('단어의 길이가 부족해요.')} isOpen={isNotEnoughLetters} variant="warning" />
      <Alert message={t('존재하지 않는 단어에요.')} isOpen={isNotMeaningful} variant="warning" />
      <Guide isOpen={isOpen} isClose={popupHandler}></Guide>
      <ResultPopup isOpen={isGameWon} leftFunction={() => { goMainPage() }} rightFunction={() => { goNextQuiz() }} title="정답" info={info} lBtn="메인으로" rBtn="다른문제풀기"/>
      <ResultPopup isOpen={isGameLost} leftFunction={() => { goMainPage() }} rightFunction={() => { goNextQuiz() }} title="오답" info={info} lBtn="메인으로" rBtn="다른문제풀기" />
      
      {/* <LevelPopUp isOpen={isOpen} isClose={popupHandler}/> */}
    </div>
  );
}

export default ProblemPage;