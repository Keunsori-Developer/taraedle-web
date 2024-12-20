import { CONFIG } from '../constant/config'
import apiClient from './auth'
import { toCharArray } from './stringToCharArray'
import { Meaning } from './wordFromWeb'

export interface wordInfo {
    id: string,
    value: string,
    length: number,
    count: number,
    definitions: Meaning[],
}

export const getQuiz = () => {
    const quizJson = window.localStorage.getItem('quiz');
    if (quizJson) {
        const quiz = JSON.parse(quizJson);
        console.log(`quiz : ${quiz.word.value}`);
        return quiz;
    }
}

export const isWinngWord = (word: string) => {
    const charVal = toCharArray(getQuiz().word.value);
    return word === charVal;
}

export const exportResult = async (tries: number, isSolved: boolean) => {
    try {
        await apiClient.post<any>(
            `/word/solve`, {
                wordId: getQuiz().uuid,
                attempts: tries,
                isSolved: isSolved
            }
        )
    } catch (error) {
        throw error;
    }
}

export const getAnswer = () => {
    if (getQuiz()) {
        return {solution : getQuiz().word.value};
    } else {
        return {solution: ''};
    }
    // return {solution: '테스트'}
}
export const { solution } = getAnswer()