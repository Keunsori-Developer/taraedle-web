import { CONFIG } from '../constant/config'
import apiClient, { getAccessToken, getNewToken } from './auth'
import { toCharArray } from './stringToCharArray'
import { Word, WordFromWeb, Meaning } from './wordFromWeb'

const answer = await WordFromWeb(6, true, false)

export interface wordInfo {
    id: string,
    value: string,
    length: number,
    count: number,
    definitions: Meaning[],
}

export const isWinngWord = (word: string) => {
    const charVal = toCharArray(answer.value)
    return word === charVal;
}

export const winningWordInfo = () => {
    const info: wordInfo = {
        ...answer
    }
    return info

}

export const exportResult = async (tries: number, isSolved: boolean) => {
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

export const getWordOfDay = () => {
    const epochMs = new Date(CONFIG.startDate).valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const nextday = (index + 1) * msInDay + epochMs
    return {
        solution: answer.value,
        tomorrow: nextday,
    }
  }
  

export const { solution, tomorrow } = getWordOfDay()