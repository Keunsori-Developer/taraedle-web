import React from "react";

export const MainPage = () => {
    return (
        <div>
            <button onClick={() => { window.location.href = '/problem' }}>게임 시작</button>
        </div>
    )
}