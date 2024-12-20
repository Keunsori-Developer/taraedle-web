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
  console.log(queryParams);
  try {
    const response = await apiClient.get<Word>(
      `/word${queryParams ? `?${queryParams}` : ''}`
    )
    const data = response.data;
    console.log(data.value);
    const parseDefinitions: Meaning[] = JSON.parse(data.definitions);
    const result = {
      ...data,
      definitions: parseDefinitions
    }
    return result
  } catch (error) {
    throw error
  } finally {
    // window.location.href = '/problem'
  }
}

export const getQuiz = async (difficulty: string) => {
  try {
    console.log(difficulty);
    const response = await apiClient.post<Word>(
      `/quiz`, {difficulty}
    )
    const data = response.data;
    console.log(data.value);
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