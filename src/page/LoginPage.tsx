import React, { useEffect } from "react";
import { Button } from "../component/button/Button";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";

export const LoginPage = () => {
    return (
        <div>
            <Button value="Google Login" onClick={() => {
                window.location.href = process.env.REACT_APP_API_URL + "/auth/login/google";
            }} />
        </div>
    )
}