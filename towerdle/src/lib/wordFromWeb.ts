import apiClient from './auth'

export interface Word {
  id: string,
  value: string,
  length: number,
  count: number,
  definitions: string,
}

export interface Meaning {
  pos: string,
  meanings: string[]
}

export const WordFromWeb = async (count?: number, complexVowel?: boolean, complexConsonant?: boolean) => {
  const queryParams = [
    count ? `count=${count}` : ``,
    complexVowel ? `complexVowel=${complexVowel}` : ``,
    complexConsonant ? `complexConsonant=${complexConsonant}` : ``
  ].filter(Boolean).join('&')

  try {
    const response = await apiClient.get<Word>(
      `/word${queryParams ? `?${queryParams}` : ''}`
    )
    const data = response.data  
    const parseDefinitions: Meaning[] = JSON.parse(data.definitions);
    const result = {
      ...data,
      definitions: parseDefinitions
    }
    return result
  } catch (error) {
    throw error
  }
}