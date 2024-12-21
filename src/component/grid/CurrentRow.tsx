import { Cell } from "./Cell";
import { CONFIG } from "../../constant/config";

type Props = {
    count: number,
    guess: string[]
}

export const CurrentRow = ({ count, guess }: Props) => {
    const splitGuess = guess
    const emptyCells = Array.from(Array(count - splitGuess.length))

    return (
        <div className="flex justify-center mb-1">
            {splitGuess.map((letter, i) => (
                <Cell key={i} value={letter}/>
            ))}
            {emptyCells.map((_, i) => (
                <Cell key={i}/>
            ))}
        </div>
    )
}