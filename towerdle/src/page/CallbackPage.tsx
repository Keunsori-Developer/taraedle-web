import React from "react";
import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

export const CallbackPage = () => {
    const [code, setCode] = useState<string | null>(null);
    const location = useLocation()
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        setCode(params.get('code'))
    }, [location.search]);
    if (code) {
        console.log(code)
    }
    return (
        <div>
            Callback test
        </div>
    )
}