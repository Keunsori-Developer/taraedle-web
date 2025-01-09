import { useState } from 'react'
import { CONFIG } from '../constant/config'
import apiClient from './auth'
import { createContext } from 'vm'
import { Quiz, Meaning } from '../constant/type'

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