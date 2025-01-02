import { useState } from 'react'
import { CONFIG } from '../constant/config'
import apiClient from './auth'
import { createContext } from 'vm'

// export interface Word {
//   id: string,
//   value: string,
//   length: number,
//   count: number,
//   definitions: string,
// }

export interface Quiz {
  uuid: string,
  word: {
    value: string,
    definitions: string,
    length: number,
    count: number
  },
  difficulty: {
    lengthMin: number,
    lengthMax: number,
    countMin: number,
    countMax: number,
    complexVowel: boolean,
    complexConsonant: boolean,
    maxAttempts: number
  }
}

export interface Meaning {
  pos: string,
  meanings: string[]
}

export const quizSetting = async (difficulty: string) => {
  try {
    const response = await apiClient.post<Quiz>(
      `/quiz`, {difficulty}
    )
    const data = response.data;
    const parseDefinitions: Meaning[] = JSON.parse(data.word.definitions);
    const result = {
      ...data,
      word: {
        ...data.word,
        definitions: parseDefinitions
      }
    }
    const quiz = JSON.stringify(result);
    window.localStorage.setItem('quiz', quiz);
    window.location.href = 'problem';
  } catch (error) {
    throw error
  }
}


export const isAvailableWord = async (word: string) => {
  try {
    await apiClient.get(
      `/word/${word}`
    )
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      throw error;
    }
    throw error;
  }
}