import React from "react";
import { Transition } from "@headlessui/react";
import '../style/style.css'
import { quizSetting } from "../../lib/wordFromWeb";
import { CONFIG } from "../../constant/config";

interface props {
    isOpen: boolean
}

export const LevelPopUp = ({ isOpen }: props) => {
    const testLevel = () => {
        quizSetting('EASY');
    }
    
    return (
        <Transition
            show={isOpen}
            enter="ease-out duration-300 transition"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="resultBox">
                <button onClick={testLevel}>5</button>
            </div>
        </Transition>
    )
}