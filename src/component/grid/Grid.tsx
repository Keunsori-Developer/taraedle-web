import { EmptyRow } from "./EmptyRow";
import { CONFIG } from "../../constant/config";
import { CompletedRow } from "./CompletedRow";
import { CurrentRow } from "./CurrentRow";

type Props = {
    tries: number,
    count: number,
    guesses: string[][]
    currentGuess: string[]
}

export const Grid = ({ tries, count, guesses, currentGuess }: Props) => {
    const empties = 
        guesses.length < tries - 1
            ? Array.from(Array(tries - 1 - guesses.length))
            : []    
    return (
        <div className="pb-6">
            {guesses.map((guess, i) => (
                <CompletedRow key={i} guess={guess}/>
            ))}
            {guesses.length < tries && <CurrentRow guess={currentGuess} />}
            {empties.map((_, i) => (
                <EmptyRow count={count} key={i}/>
            ))}
        </div>
    )
}