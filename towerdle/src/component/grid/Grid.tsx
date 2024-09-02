import { EmptyRow } from "./EmptyRow";
import { CONFIG } from "../../constant/config";

type Props = {
    guesses: string[][]
    currentGuess: string[]
}

export const Grid = ({ guesses, currentGuess }: Props) => {
    const empties = 
        guesses.length < CONFIG.tries - 1
            ? Array.from(Array(CONFIG.tries - 1 - guesses.length))
            : []    
    return (
        <div className="pb-6">

            {empties.map((_, i) => (
                <EmptyRow key={i}/>
            ))}
        </div>
    )
}