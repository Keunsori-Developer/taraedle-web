import { useEffect, useState } from 'react';
import titleImg from '../asset/title.png'
import { Button } from "../component/button/Button";
import { Logout } from '../lib/auth';

export const MainPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)

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
            <Button value="게임시작" onClick={() => {window.location.href = '/problem'}}/>
            <Button value="챌린지" onClick={() => { }}/>
            <Button value="설정" onClick={() => { }} />
            {isLogin ?
                <Button value="로그아웃" onClick={() => { 
                    Logout()
                }} />
                : 
                <Button value="로그인" onClick={() => {
                    window.open('https://api.randommagic.xyz/auth/login/google', '로그인', 'width=430,height=500,location=no,status=no,scrollbars=yes')
                    }} />
            }
        </div>
    )
}