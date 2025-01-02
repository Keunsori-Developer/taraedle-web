import { useState } from 'react'
import { CONFIG } from '../constant/config'
import apiClient from './auth'
import { toCharArray } from './stringToCharArray'
import { Meaning } from './wordFromWeb'

export interface wordInfo {
    value: string,
    length: number,
    count: number,
    definitions: Meaning[],
}

const quizData = window.localStorage.getItem('quiz');
export const quizValue = quizData ? JSON.parse(quizData) : null;

export const getQuizSetting = () => {
    return {
        tries: quizValue.difficulty.maxAttempts,
        count: quizValue.word.count
    };
}

export const isWinngWord = (word: string) => {
    const charVal = toCharArray(quizValue.word.value);
    return word === charVal;
}

export const exportResult = async (tries: number, isSolved: boolean) => {
    try {
        await apiClient.post<any>(
            `/quiz/${quizValue.uuid}`, {
                attempts: tries,
                solved: isSolved
            }
        )
    } catch (error) {
        throw error;
    }
}

export const getAnswer = () => {
    return { solution: quizValue.word.value }
}
export const { solution } = getAnswer();