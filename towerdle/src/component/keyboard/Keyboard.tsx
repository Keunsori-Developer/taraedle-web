import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Key } from "./Key";

export const Keyboard = () => {
    return (
        <div>
            <Key
                children={''}
                value={''}
                width={''}
                status={''}
                onClick={() => { }}
            ></Key>
        </div>
    )
}