import axios from 'axios'
import { toCharArray } from './stringToCharArray'

interface Word {
  value: string
}

export const WordFromWeb = async () => {
  console.log('wordFromWeb')
  try {
    const response = await axios.get<Word>(
      `https://api.randommagic.xyz/word?count=6&complexVowel=true&complexConsonant=false`
    )
    const val = response.data.value
    return val
  } catch (error) {
    throw error
  }
}