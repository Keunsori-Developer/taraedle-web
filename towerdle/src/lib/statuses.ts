import { ORTHOGRAPHY } from "../constant/orthography"
import { ORTHOGRAPHY_PATTERN } from "./tokenizer"
import { solution } from "./words"
import { toCharArray } from "./stringToCharArray"

export type CharStatus = 'absent' | 'present' | 'correct'

export type CharValue = typeof ORTHOGRAPHY[number]

export const getStatuses = (
    guesses: string[][]
): { [key: string]: CharStatus } => {
    const charObj: { [key: string]: CharStatus } = {}
    const answerWord = solution
    console.log(answerWord)
    const wordArr = toCharArray(answerWord)
    console.log(wordArr)
    return charObj;
}