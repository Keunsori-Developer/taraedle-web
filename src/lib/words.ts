import { useState } from 'react'
import { CONFIG } from '../constant/config'
import apiClient from './auth'
import { toCharArray } from './stringToCharArray'
import { Meaning, Quiz } from '../constant/type'

const quizData = window.localStorage.getItem('quiz');

const dummyData: Quiz = {
    uuid: "string",
    word: {
        value: "테스트",
        definitions: "string",
        length: 6,
        count: 6
    },
    difficulty: {
        lengthMin: 6,
        lengthMax: 6,
        countMin: 6,
        countMax: 6,
        complexVowel: true,
        complexConsonant: false,
        maxAttempts: 6
    }
}

export const quizValue = quizData ? JSON.parse(quizData) : dummyData;

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