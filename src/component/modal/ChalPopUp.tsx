import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import '../style/style.css'
import { quizSetting } from "../../lib/wordFromWeb";
import { CONFIG } from "../../constant/config";
import { Modal, Quiz } from "../../constant/type";
import { Alert } from "./Alert";
import { useTranslation } from 'react-i18next';
import { Grid } from "../grid/Grid";

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
    const [clearStatus, setClearStatus] = useState<number>(0);  // 0 : 미진행, 1 : 진행중, 2 : 진행완료
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [date, setDate] = useState<number[]>([]);
    const [qData, setQData] = useState<string[][]>([]);

    const errMsgUp = () => {
        setIsAlreadyClear(true)
          return setTimeout(() => {
            setIsAlreadyClear(false)
          }, ALERT_TIME_MS);
    }
    
    const challengeInProgress = () => {
        localStorage.setItem('wip', '1');
        window.location.href = 'problem';
    }

    useEffect(() => {
        const now = new Date();
        const dateData = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
        setDate(dateData);
        if (localStorage.getItem('accessToken')) {
            quizSetting("CHALLENGE")
                .then(() => {
                    const quizData = localStorage.getItem('quiz');
                    if (quizData) {
                        setQuiz(JSON.parse(quizData));
                    }
                    if (localStorage.getItem('wip')) {
                        setClearStatus(1);
                    } else {
                        setClearStatus(0);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status == 400) {
                        const data = localStorage.getItem('chalArr');
                        if (data) {
                            const arr: string[][] = JSON.parse(data);
                            setQData(arr);
                        }
                        setClearStatus(2);
                }
            });
        }
    }, [])
    
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
                <div className="infoBox" style={{ alignContent: "start" }}>
                    <span style={{fontSize: '2.5rem', marginTop: '1rem'}}>
                        챌린지
                    </span>
                    <br/>
                    <span style={{ width: '100%', textAlign:'left', margin: '0 1rem' }}>
                        <span>
                            {date[0]}년 {date[1]}월 {date[2]}일<br/>
                            챌린지 진행 
                        {clearStatus == 0 ? 
                            "가능" : clearStatus == 1 ? "중" : "완료"
                        }
                        <br/>
                        </span>
                        {clearStatus < 2 ? 
                            <>
                                <br/>
                                <h2 style={{ fontSize: '1.1rem' }}>챌린지 모드란?</h2>
                                <span  style={{textAlign: 'left'}}>
                                    하루에 한 번 모두가 같은 문제를 풀어 경쟁할 수 있습니다.<br />
                                    새로운 챌린지 단어는 자정에 갱신됩니다.(KST 기준)
                                </span>
                                <br/>
                                <br/>
                                <h2 style={{ fontSize: '1.1rem' }}>오늘의 단어 정보</h2>
                                <span style={{ textAlign: 'left' }}>
                                    글자 수 : {quiz?.word.length} 글자<br/>
                                    자모 갯수 : {quiz?.word.count} 개<br />
                                    최대 입력 가능 횟수 : {quiz?.word.count} 번
                                </span>
                                <button className="select" onClick={() => {challengeInProgress()}} value={'CHALLENGE'}>시작</button>
                            </> :
                            <>
                                <span  style={{textAlign: 'left'}}>
                                    새로운 챌린지 단어는 자정에 갱신됩니다.(KST 기준)
                                </span><br/><br/>
                                <h2 style={{ fontSize: '1.1rem' }}>나의 풀이 내역</h2>
                                <Grid tries={qData.length } count={qData.length} guesses={qData} currentGuess={[]}/>
                            </>
                        }
                    </span>
                    {/* {clearStatus} */}
                    {/* <button className="select" onClick={(e) => selectQuiz(e.currentTarget.value)} value={'CHALLENGE'}>시작</button> */}
                    <button className="select" onClick={() => { isClose() }}>닫기</button>
                </div>
                
            </Transition>
            <Alert message={t('오늘의 챌린지를 이미 완료하였습니다.')} isOpen={isAlreadyClear} variant="warning" />
        </>
    )
}