import { useState } from 'react'
import { CONFIG } from '../constant/config'
import apiClient from './auth'
import { toCharArray } from './stringToCharArray'
import { Meaning, Quiz } from './wordFromWeb'

export interface wordInfo {
    id: string,
    value: string,
    length: number,
    count: number,
    definitions: Meaning[],
}

const quizData = window.localStorage.getItem('quiz');
const quizValue = quizData ? JSON.parse(quizData) : null;

export const getQuizSetting = () => {
    return {
        tries: quizValue.difficulty.maxAttempts,
        count: quizValue.word.count
    };
}


export const getQuiz = () => {
    const quizJson = window.localStorage.getItem('quiz');
    if (quizJson) {
        const quiz = JSON.parse(quizJson);
        console.log(
            `
            word: ${quiz.word.value}
            count: ${quiz.word.count}
            attempt: ${quiz.difficulty.maxAttempts}
            `
        )
        return quiz;
    }
}

export const isWinngWord = (word: string) => {
    const charVal = toCharArray(quizValue.word.value);
    return word === charVal;
}

export const exportResult = async (tries: number, isSolved: boolean) => {
    try {
        await apiClient.post<any>(
            `/word/solve`, {
                wordId: quizValue.uuid,
                attempts: tries,
                isSolved: isSolved
            }
        )
    } catch (error) {
        throw error;
    }
}

export const getAnswer = () => {
    return quizValue
    // if (getQuiz()) {
    //     return {solution : getQuiz().word.value};
    // } else {
    //     return {solution: ''};
    // }
    // return {solution: '테스트'}
}
export const { solution } = quizValue.word.value;