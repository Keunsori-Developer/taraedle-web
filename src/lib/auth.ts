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

// export const clearToken = () => {
//     localStorage.removeItem('accessToken')
//     localStorage.removeItem('refreshToken')
// }

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

let isRefreshing = false;
let failedQueue: any[] = [];

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    return apiClient(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                })
            }
            originalRequest._retry = true;
            isRefreshing = true;
            return new Promise(async (resolve, reject) => {
                try {
                    const newToken = await getNewToken()
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                    failedQueue.forEach(request => request.resolve(newToken));
                    failedQueue = [];

                    resolve(apiClient(originalRequest));
                } catch (err) {
                    failedQueue.forEach(request => request.reject(err));
                    failedQueue = [];
                    reject(err);
                } finally {
                    isRefreshing = false;
                }
            });
        } else if (error.response && error.response.status === 400) {
            const errorCode = error.response.data?.errorCode;
            console.log(`
                ${error.response}
                ${errorCode}
                `);
            switch (errorCode) {
                case 'INVALID_WORD':
                    localStorage.setItem('wordError', 'invalid');
                    break;
                default:
                    break;
            }
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
        // localStorage.removeItem('code')
        // clearToken()
        localStorage.clear();
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
        setRefreshToken(response.data.refreshToken)
        setAccessToken(response.data.accessToken)
        return response.data.accessToken;
    } catch (error) {
        throw error
    }
}

export default apiClient;