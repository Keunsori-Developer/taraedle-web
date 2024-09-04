import { Cell } from "./Cell";
import { getGuessStatuses } from "../../lib/statuses";

type Props = {
    guess: string[]
}

export const CompletedRow = ({ guess }: Props) => {
    const statuses = getGuessStatuses(guess)

    return (
        <div className="flex justify-center mb-1">
            {guess.map((letter, i) => (
                <Cell key={i} value={letter} status={statuses[i]}/>
            ))}
        </div>
    )
}