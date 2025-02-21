export interface UserInfo{
    id?: string,
    email?: string,
    name?: string,
    quizStats?: StatusInfo
}

export interface StatusInfo{
    solvedCnt?: number,
    totalCnt?: number,
    lastSolve?: string,
    details?: {
        EASY?: SolveLevelCount,
        MEDIUM?: SolveLevelCount,
        HARD?: SolveLevelCount,
        VERYHARD?: SolveLevelCount
    }
}

export interface SolveLevelCount{
    totalCnt: number,
    solvedCnt: number,
    solvedAttemptsStats: {
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