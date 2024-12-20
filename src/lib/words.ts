import { useState } from 'react'
import { CONFIG } from '../constant/config'
import apiClient, { getAccessToken, getNewToken } from './auth'
import { toCharArray } from './stringToCharArray'
import { Word, WordFromWeb, Meaning } from './wordFromWeb'

// const answer: wordInfo = {
//     id : '1',
//     value : '1',
//     length : 1,
//     count : 1,
//     definitions : [] 
// }

const answer: wordInfo = await WordFromWeb(6, true, false);
// const [answer, setAnswer] = useState<wordInfo | null>(null);

// export const settingQuestion = async (count: number, complexVowel: boolean = false, complexConsonant: boolean = false) => {
//     const word: wordInfo = await WordFromWeb(count, complexVowel, complexConsonant);
//     const answer = JSON.stringify(word);
//     window.localStorage.setItem('answer', answer);
// }

export interface wordInfo {
    id: string,
    value: string,
    length: number,
    count: number,
    definitions: Meaning[],
}

export const isWinngWord = (word: string) => {
    if (answer) {
        const charVal = toCharArray(answer.value)
        return word === charVal;
    }
}

export const winningWordInfo = () => {
    // if (answer) {
        const info: wordInfo = {
            ...answer
        }
        return info
    // }
}

export const exportResult = async (tries: number, isSolved: boolean) => {
    if (answer) {
        try {
            await apiClient.post<any>(
                `/word/solve`, { 
                    wordId: answer.id,
                    attempts: tries,
                    isSolved: isSolved
                },
            )
        } catch (error) {
            throw error;
        }
    }
}

export const getAnswer = () => {
    return {solution : answer.value};
}
export const { solution } = getAnswer()

// export const getWordOfDay = () => {
//     if (answer) {
//         const epochMs = new Date(CONFIG.startDate).valueOf()
//         const now = Date.now()
//         const msInDay = 86400000
//         const index = Math.floor((now - epochMs) / msInDay)
//         const nextday = (index + 1) * msInDay + epochMs
//         return {
//             solution: answer.value,
//             tomorrow: nextday,
//         }
//     }
// }
  

// export const { solution, tomorrow } = getWordOfDay()