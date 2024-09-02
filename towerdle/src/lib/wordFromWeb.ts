import axios from 'axios'
import { error } from 'console'
import react from 'react';

interface Word {
  value: string
}

export const WordFromWeb = async() => {
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