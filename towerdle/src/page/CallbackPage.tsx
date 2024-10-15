import React from "react";
import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import { Login } from "../lib/auth";
import { Button } from "../component/button/Button";

export const CallbackPage = () => {
    const [code, setCode] = useState<string | null>(null);
    const location = useLocation()
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        setCode(params.get('code'))
    }, [location.search]);
    if (code) {
        localStorage.setItem('code', code)
        Login(code)
    }
    return (
        <div>
            Redirecting...
        </div>
    )
}