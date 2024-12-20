import apiClient from './auth'

export interface Word {
  id: string,
  value: string,
  length: number,
  count: number,
  definitions: string,
}

export interface Quiz {
  uuid: string,
  word: {
    value: string,
    definitions: string,
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
    const response = await apiClient.post<Quiz>(
      `/quiz`, {difficulty}
    )
    // console.log(response);
    const data = response.data;
    // console.log(data.word.value);
    const parseDefinitions: Meaning[] = JSON.parse(data.word.definitions);
    const result = {
      ...data,
      definitions: parseDefinitions
    }
    // return result
    const quiz = JSON.stringify(result);
    window.localStorage.setItem('quiz', quiz);
    window.location.href = 'problem';
  } catch (error) {
    throw error
  }
}