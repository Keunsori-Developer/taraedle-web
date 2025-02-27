import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import '../style/style.css'
import { quizSetting } from "../../lib/wordFromWeb";
import { CONFIG } from "../../constant/config";
import { Modal } from "../../constant/type";
import { Alert } from "./Alert";
import { useTranslation } from 'react-i18next';

const ALERT_TIME_MS = 2000

export const LevelPopUp = ({ isOpen, isClose }: Modal) => {
    const selectQuiz = (value: string) => {
        localStorage.setItem('difficulty', value);
        isClose();
        quizSetting(value).catch((error) => {
            // console.log('already clear')
            if (error.response && error.response.status == 400) {
                errMsgUp()
            }
        });
    }
    
    const [isAlreadyClear, setIsAlreadyClear] = useState<boolean>(false);
    const errMsgUp = () => {
        setIsAlreadyClear(true)
          return setTimeout(() => {
            setIsAlreadyClear(false)
          }, ALERT_TIME_MS);
      }

    const { t } = useTranslation()
    
    
    return (
        <>
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
                    <button className="select" onClick={(e) => selectQuiz(e.currentTarget.value)} value={'EASY'}>
                        <h1 style={{fontSize: '1.2rem'}}>
                            쉬움
                        </h1>
                        2~3글자, 4~4개 자모음, 복합자모음 없음, 최대 7번 시도
                    </button>
                    <button className="select" onClick={(e) => selectQuiz(e.currentTarget.value)} value={'MEDIUM'}>
                        <h1 style={{fontSize: '1.2rem'}}>
                            보통
                        </h1>
                        2~3글자, 5~6개 자모음, 복합자모음 랜덤, 최대 6번 시도
                    </button>
                    <button className="select" onClick={(e) => selectQuiz(e.currentTarget.value)} value={'HARD'}>
                        <h1 style={{fontSize: '1.2rem'}}>
                            어려움
                        </h1>
                        2~3글자, 7~9개 자모음, 복합자모음 랜덤, 최대 6번 시도
                    </button>
                    <button className="select" onClick={(e) => selectQuiz(e.currentTarget.value)} value={'CHALLENGE'}>
                        <h1 style={{fontSize: '1.2rem'}}>
                            챌린지
                        </h1>
                        3~4글자, 8~11개 자모음, 복합자모음 랜덤, 최대 8번 시도
                    </button>
                    <button className="select" onClick={() => { isClose() }}>닫기</button>
                </div>
                
            </Transition>
            <Alert message={t('오늘의 챌린지를 이미 완료하였습니다.')} isOpen={isAlreadyClear} variant="warning" />
        </>
    )
}