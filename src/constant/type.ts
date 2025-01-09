export interface Statistic{
    solveCount: number,
    lastSolve: string,
    solveStreak: number,
    detailedStats: {
        EASY: SolveLevelCount,
        MEDIUM: SolveLevelCount,
        HARD: SolveLevelCount,
        VERYHARD: SolveLevelCount
    }
}

export interface SolveLevelCount{
    totalSolved: number,
    averageAttempts: number,
    attempCounts: {
        "1": number,
        "2": number,
        "3": number,
        "4": number,
        "5": number,
        "6": number
    }
}

export interface Modal {
    isOpen: boolean,
    isClose: () => void
}

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

export interface WordInfo {
    value: string,
    length: number,
    count: number,
    definitions: Meaning[],
}