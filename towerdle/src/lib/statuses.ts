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
    const solutionChars = toCharArray(solution).split(ORTHOGRAPHY_PATTERN).filter((i) => i)
    guesses.forEach((word) => {
        word.forEach((letter, i) => {
            if (!solutionChars.includes(letter)) {
                return(charObj[letter] = 'absent')
            }
            if (letter === solutionChars[i]) {
                return(charObj[letter] = 'correct')
            }
            if (charObj[letter] !== 'correct') {
                return(charObj[letter] = 'present')
            }
        })
    })
    return charObj;
}

export const getGuessStatuses = (guess: string[]): CharStatus[] => {
    const splitSolution = toCharArray(solution).split(ORTHOGRAPHY_PATTERN).filter((i) => i)
    const splitGuess = guess

    const solutionCharsTaken = splitSolution.map((_) => false)
    const statuses: CharStatus[] = Array.from(Array(guess.length))

    splitGuess.forEach((letter, i) => {
        if (letter === splitSolution[i]) {
            statuses[i] = 'correct'
            solutionCharsTaken[i] = true
            return
        }
    })

    splitGuess.forEach((letter, i) => {
        if (statuses[i]) return
        
        if (!splitSolution.includes(letter)) {
            statuses[i] = 'absent'
            return
        }

        const indexOfPresentChar = splitSolution.findIndex(
            (x, index) => x === letter && !solutionCharsTaken[index]
        )

        if (indexOfPresentChar > -1) {
            statuses[i] = 'present'
            solutionCharsTaken[indexOfPresentChar] = true
            return
        } else {
            statuses[i] = 'absent'
            return
        }
    })

    return statuses
}