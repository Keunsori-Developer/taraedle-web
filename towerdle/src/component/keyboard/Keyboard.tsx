import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Key } from "./Key";
import { ORTHOGRAPHY } from "../../constant/orthography";
import { getStatuses } from "../../lib/statuses";


type Props = {
    onChar: (value: string) => void,
    onDelete: () => void,
    onEnter: () => void,
    guesses: string[][]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
    const charStatuses = getStatuses(guesses)

    const onClick = (value: string) => {
        console.log(value)
    }
    return (
        <div>
            <div className="flex justify-center mb-1">
            {ORTHOGRAPHY.slice(0, Math.floor(ORTHOGRAPHY.length * 0.28)).map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={onClick}
                        status={'absent'}/>
                )
            )}
            </div>
            <div className="flex justify-center mb-1">
            {ORTHOGRAPHY.slice(Math.floor(ORTHOGRAPHY.length * 0.28), Math.floor(ORTHOGRAPHY.length * 0.58)).map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={onClick}
                        status={'absent'}/>
                )
            )}
            </div>
            <div className="flex justify-center mb-1">
            {ORTHOGRAPHY.slice(Math.floor(ORTHOGRAPHY.length * 0.58), Math.floor(ORTHOGRAPHY.length * 0.82)).map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={onClick}
                        status={'absent'}/>
                )
            )}
            </div>
            <div className="flex justify-center mb-1">
            {ORTHOGRAPHY.slice(Math.floor(ORTHOGRAPHY.length * 0.82), ORTHOGRAPHY.length).map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={onClick}
                        status={'absent'}/>
                )
            )}
            </div>
        </div>
    )
}