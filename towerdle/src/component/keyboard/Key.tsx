import { ReactNode } from "react";
import classnames from "classnames";


type Props = {
    children: any,
    value: any,
    width: any,
    status: any,
    onClick: (value: any) => void
}

export const Key = ({
    children,
    status,
    width,
    value,
    onClick
}: Props) => {
    const classes = classnames(
        'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none',
        {
          'bg-slate-200 hover:bg-slate-300 active:bg-slate-400': !status,
          'bg-slate-400 text-white': status === 'absent',
          'bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white':
            status === 'correct',
          'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white':
            status === 'present',
        }
      )
    
    return (
        <button
            className="classes"
        >

        </button>
    )
}