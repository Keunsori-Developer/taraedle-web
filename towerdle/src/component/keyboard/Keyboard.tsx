import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Key } from "./Key";
import { ORTHOGRAPHY } from "../../constant/orthography";

export const Keyboard = () => {
    return (
        <div className="flex justify-center mb-1">
            {ORTHOGRAPHY.map(
                (char) => (
                    <Key
                        key={char}
                        value={char}
                        onClick={(value: string) => { console.log(value)}}
                        status={''}/>
                )
            )}
        </div>
    )
}