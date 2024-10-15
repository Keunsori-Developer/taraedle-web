import axios from "axios";

interface user {
    id: string,
    email: string,
    name: string
}

interface loginToken {
    accessToken: string,
    refreshToken: string,
    user: user
}

export const Login = async (code: string) => {
    console.log('login')
    try {
        const response = await axios.post<loginToken>(
            `https://api.randommagic.xyz/auth/login/google/callback`, { code },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
        const data: loginToken = response.data;
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        if (window.opener) {
            window.opener.postMessage({ type: 'LOGIN_SUCCESS' }, window.location.origin)
        }

        window.close()
    } catch (error) {
    }
}

export const Logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
        await axios.post<void>(
            `https://api.randommagic.xyz/auth/logout`, { refreshToken },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log('로그아웃 성공')
        localStorage.removeItem('code')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.reload()
    } catch (error) {
        console.log('로그아웃 실패')
    }
}