import React from "react";

type props = {
    value: string,
    onClick: () => void
}

export const Button = ({ value, onClick }: props) => {
    const style = {
        width: '15%',
        height: '60px',
        border: 'solid 1px',
        borderRadius: '3px',
        margin: '10px',
        fontSize: '150%',
    }
    return (
        <div>
            <button style={style} onClick={onClick}>{value}</button>
        </div>
    )
}