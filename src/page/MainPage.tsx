import { useEffect, useState } from 'react';
import titleImg from '../asset/title.png'
import { Button } from "../component/button/Button";
import { Logout } from '../lib/auth';
import { LevelPopUp } from '../component/modal/LevelPopUp';
import Statistic from '../component/modal/Statistic';
import { ChalPopUp } from '../component/modal/ChalPopUp';

export const MainPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [levelOpen, setLevelOpen] = useState<boolean>(false)
    const [isStatOpen, setIsStatOpen] = useState<boolean>(false);
    const [chalOpen, setChalOpen] = useState<boolean>(false);

    const popupHandler = () => {
        setLevelOpen(!levelOpen);
    }

    const statHandler = () => {
        setIsStatOpen(!isStatOpen);
    }

    const chalHandler = () => {
        setChalOpen(!chalOpen)
    }

    useEffect(() => {
        if (localStorage.getItem('code') != null) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [])

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;
            if (event.data.type === 'LOGIN_SUCCESS') {
                setIsLogin(true)
                window.location.reload()
            }
        }
        window.addEventListener('message', handleMessage)
        return () => {
            window.removeEventListener('message', handleMessage);
        }
    }, [])

    return (
        <div>
            <img style={{ margin: '100px auto 100px auto' }} src={titleImg} />
            {isLogin ?
                <>
                    <Button value="게임시작" onClick={popupHandler} />
                    <Button value="챌린지" onClick={chalHandler}/>
                    {/* <Button value="설정" onClick={() => { }} /> */}
                    <Button value="로그아웃" onClick={() => { 
                        Logout()
                    }} />
                    <Button value="통계보기" onClick={() => {statHandler()}}/>
                </>
                : 
                <Button value="로그인" onClick={() => {
                    window.open(process.env.REACT_APP_API_URL + '/auth/login/google', '로그인', 'width=430,height=500,location=no,status=no,scrollbars=yes')
                    }} />
            }

            <LevelPopUp isOpen={levelOpen} isClose={popupHandler} />
            <ChalPopUp isOpen={chalOpen} isClose={chalHandler}/>
            <Statistic isOpen={isStatOpen} isClose={statHandler} />
        </div>
    )
}