import axios from 'axios'
import { toCharArray } from './stringToCharArray'
import apiClient from './auth'

interface Word {
  id: string,
  value: string
}

export const WordFromWeb = async (count?: number, complexVowel?: boolean, complexConsonant?: boolean) => {
  const queryParams = [
    count ? `count=${count}` : ``,
    complexVowel ? `complexVowel=${complexVowel}` : ``,
    complexConsonant ? `complexConsonant=${complexConsonant}` : ``
  ].filter(Boolean).join('&')

  try {
    const response = await apiClient.get<Word>(
      // `/word?count=6&complexVowel=true&complexConsonant=false`
      `/word${queryParams ? `?${queryParams}` : ''}`
    )
    const val = response.data
    console.log(val)
    return val
  } catch (error) {
    throw error
  }
}