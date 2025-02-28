import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import '../style/style.css'
import { quizSetting } from "../../lib/wordFromWeb";
import { CONFIG } from "../../constant/config";
import { Modal } from "../../constant/type";
import { Alert } from "./Alert";
import { useTranslation } from 'react-i18next';

const ALERT_TIME_MS = 2000

export const ChalPopUp = ({ isOpen, isClose }: Modal) => {
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
                    <h1 style={{fontSize: '1.2rem', marginTop: '1rem'}}>
                        챌린지
                    </h1>
                        <h2 style={{ fontSize: '1.1rem' }}>챌린지 모드란?</h2>
                    <span  style={{textAlign: 'left'}}>
                        하루에 한 번 모두가 같은 문제를 풀어 경쟁할 수 있습니다.<br />
                        새로운 챌린지 단어는 자정에 갱신됩니다.(KST 기준)
                    </span>
                    <button className="select" onClick={(e) => selectQuiz(e.currentTarget.value)} value={'CHALLENGE'}>시작</button>
                    <button className="select" onClick={() => { isClose() }}>닫기</button>
                </div>
                
            </Transition>
            <Alert message={t('오늘의 챌린지를 이미 완료하였습니다.')} isOpen={isAlreadyClear} variant="warning" />
        </>
    )
}