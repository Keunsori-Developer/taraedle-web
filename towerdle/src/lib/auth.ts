import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

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

interface newToken{
    accessToken: string,
    refreshToken: string
}

export const getAccessToken = () : string | null => {
    return localStorage.getItem('accessToken')
}

export const setAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token)
}

export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken')
}

export const setRefreshToken = (token: string) => {
    localStorage.setItem('refreshToken', token)
}

export const clearToken = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://api.randommagic.xyz',
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(
    (config) => {
        config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            getNewToken()
            return;
        }
        return Promise.reject(error);
    }
)

export const Login = async (code: string) => {
    try {
        const response = await apiClient.post<loginToken>(
            `/auth/login/google/callback`, { code },
        )
        const data: loginToken = response.data;
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
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
        await apiClient.post<void>(
            `/auth/logout`, { refreshToken },
        )
        localStorage.removeItem('code')
        clearToken()
        window.location.reload()
    } catch (error) {
        console.log('로그아웃 실패')
    }
}

export const getNewToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
        const response = await apiClient.post<newToken>(
            `/auth/refresh`, { refreshToken },
        )
        setAccessToken(response.data.accessToken)
        setRefreshToken(response.data.refreshToken)
    } catch (error) {
        throw error
    }
}

export default apiClient;