import React from "react";
import { Transition } from "@headlessui/react";
import '../style/style.css'
import { quizSetting } from "../../lib/wordFromWeb";
import { CONFIG } from "../../constant/config";
import { Modal } from "../../constant/type";

export const LevelPopUp = ({ isOpen, isClose }: Modal) => {
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
            <div className="infoBox">
                <button className="select" onClick={(e) => selectQuiz((e.target as HTMLButtonElement).value)} value={'EASY'}>
                    <h1 style={{fontSize: '1.2rem'}}>
                        쉬움
                    </h1>
                    2~3글자, 4~6개 자모음, 복합자모음 없음, 최대 6번 시도
                </button>
                <button className="select" onClick={(e) => selectQuiz((e.target as HTMLButtonElement).value)} value={'MEDIUM'}>
                    <h1 style={{fontSize: '1.2rem'}}>
                        보통
                    </h1>
                    2~3글자, 6~9개 자모음, 복합자모음 랜덤, 최대 6번 시도
                </button>
                <button className="select" onClick={(e) => selectQuiz((e.target as HTMLButtonElement).value)} value={'HARD'}>
                    <h1 style={{fontSize: '1.2rem'}}>
                        어려움
                    </h1>
                    3~3글자, 7~11개 자모음, 복합자모음 랜덤, 최대 6번 시도
                </button>
                <button className="select" onClick={(e) => selectQuiz((e.target as HTMLButtonElement).value)} value={'VERYHARD'}>
                    <h1 style={{fontSize: '1.2rem'}}>
                        매우 어려움
                    </h1>
                    3~4글자, 8~16개 자모음, 복합자모음 랜덤, 최대 6번 시도
                </button>
                <button className="select" onClick={() => { isClose() }}>닫기</button>
            </div>
        </Transition>
    )
}