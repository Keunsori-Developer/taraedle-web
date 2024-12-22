import React from "react";
import { Transition } from "@headlessui/react";
import '../style/style.css'
import { quizSetting } from "../../lib/wordFromWeb";
import { CONFIG } from "../../constant/config";

interface props {
    isOpen: boolean,
    isClose: () => void
}

export const LevelPopUp = ({ isOpen, isClose }: props) => {
    const selectQuiz = (value: string) => {
        localStorage.setItem('difficulty', value);
        isClose();
        quizSetting(value);
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
                <button onClick={(e) => selectQuiz((e.target as HTMLButtonElement).value)} value={'EASY'}>쉬움</button>
                <button onClick={(e) => selectQuiz((e.target as HTMLButtonElement).value)} value={'MEDIUM'}>보통</button>
                <button onClick={(e) => selectQuiz((e.target as HTMLButtonElement).value)} value={'HARD'}>어려움</button>
                <button onClick={(e) => selectQuiz((e.target as HTMLButtonElement).value)} value={'VERYHARD'}>매우 어려움</button>
                <button onClick={() => { isClose() }}>닫기</button>
            </div>
        </Transition>
    )
}