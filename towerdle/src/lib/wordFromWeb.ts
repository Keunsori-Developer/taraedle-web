import axios from 'axios'
import { toCharArray } from './stringToCharArray'

interface Word {
  id: string,
  value: string
}

export const WordFromWeb = async () => {
  try {
    const response = await axios.get<Word>(
      `https://api.randommagic.xyz/word?count=6&complexVowel=true&complexConsonant=false`
    )
    const val = response.data
    console.log(val)
    return val
  } catch (error) {
    throw error
  }
}