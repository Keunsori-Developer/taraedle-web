import { EmptyRow } from "./EmptyRow";
import { CONFIG } from "../../constant/config";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";

type Props = {
    tries: number,
    guesses: string[][]
    currentGuess: string[]
}

export const Grid = ({ tries, guesses, currentGuess }: Props) => {
    const empties = 
        guesses.length < tries - 1
            ? Array.from(Array(tries - 1 - guesses.length))
            : []    
    return (
        <div className="pb-6">
            {guesses.map((guess, i) => (
                <CompletedRow key={i} guess={guess}/>
            ))}
            {guesses.length < CONFIG.tries && <CurrentRow guess={currentGuess} />}
            {empties.map((_, i) => (
                <EmptyRow key={i}/>
            ))}
        </div>
    )
}