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
    const { t } = useTranslation()

    const onClick = (value: string) => {
        if (value === 'ENTER') {
            onEnter()
        } else if (value === 'DELETE') {
            onDelete()
        } else if (value === '') {
            return;
        } else {
            onChar(value)
        }

    }
    return (
        <div>
            <div className="flex justify-center mb-1">
            {ORTHOGRAPHY.slice(0, Math.floor(ORTHOGRAPHY.length * 10 / 36)).map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={onClick}
                        status={charStatuses[char]}/>
                )
            )}
            </div>
            <div className="flex justify-center mb-1">
            {ORTHOGRAPHY.slice(Math.floor(ORTHOGRAPHY.length * 10 / 36), Math.floor(ORTHOGRAPHY.length * 20 / 36)).map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={onClick}
                        status={charStatuses[char]}/>
                )
            )}
            </div>
            <div className="flex justify-center mb-1">
            {ORTHOGRAPHY.slice(Math.floor(ORTHOGRAPHY.length * 20 / 36), Math.floor(ORTHOGRAPHY.length * 29 / 36)).map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={onClick}
                        status={charStatuses[char]}/>
                )
            )}
            </div>
            <div className="flex justify-center mb-1">
            <Key key="enterKey" width={65.4} value="ENTER" onClick={onClick}>
            {t('ENTER')}
            </Key>
            {ORTHOGRAPHY.slice(Math.floor(ORTHOGRAPHY.length* 29 / 36), ORTHOGRAPHY.length).map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={onClick}
                        status={charStatuses[char]}/>
                )
                )}
                <Key key="deleteKey" width={65.4} value="DELETE" onClick={onClick}>
            {t('DELETE')}
            </Key>
            </div>
        </div>
    )
}