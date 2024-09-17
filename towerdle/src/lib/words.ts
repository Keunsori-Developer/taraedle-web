import { CONFIG } from '../constant/config'
import { toCharArray } from './stringToCharArray'
import { WordFromWeb } from './wordFromWeb'

const val = await WordFromWeb()
// const val = '테스트'

export const isWinngWord = (word: string) => {
    const charVal = toCharArray(val)
    return word === charVal;
}

export const getWordOfDay = () => {
    // January 1, 2022 Game Epoch
    const epochMs = new Date(CONFIG.startDate).valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const nextday = (index + 1) * msInDay + epochMs
    return {
        solution: val,
        tomorrow: nextday,
    }
  }
  

export const { solution, tomorrow } = getWordOfDay()