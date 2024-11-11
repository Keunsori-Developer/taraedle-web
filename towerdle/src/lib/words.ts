import { CONFIG } from '../constant/config'
import apiClient, { getAccessToken, getNewToken } from './auth'
import { toCharArray } from './stringToCharArray'
import { WordFromWeb } from './wordFromWeb'

const val = await WordFromWeb(6, true, false)

export const isWinngWord = (word: string) => {
    const charVal = toCharArray(val.value)
    return word === charVal;
}

export const exportResult = async (tries: number, isSolved: boolean) => {
    try {
        await apiClient.post<any>(
            `/word/solve`, { 
                wordId: val.id,
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
        solution: val.value,
        tomorrow: nextday,
    }
  }
  

export const { solution, tomorrow } = getWordOfDay()