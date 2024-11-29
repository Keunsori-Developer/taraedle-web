import { ReactNode } from "react";
import classnames from "classnames";
import { CharStatus } from "../../lib/statuses";
import { KeyValue } from "../../lib/keyboard";
import '../style/style.css'

type Props = {
    children?: ReactNode,
    value: KeyValue,
    width?: number,
    status?: CharStatus,
    onClick: (value: KeyValue) => void
}

export const Key = ({
    children,
    status,
    width = 40,
    value = '',
    onClick
}: Props) => {
    const classes = classnames(
        'flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none',
        {
          'bg-default': !status,
          'bg-absent': status === 'absent',
          'bg-correct':
            status === 'correct',
          'bg-present':
            status === 'present',
        }
      )
    
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        onClick(value)
        event.currentTarget.blur()
    }
    
    return (
        <button
            style={{width: `${width}px`, height: '58px'}}
            className={`${classes} key`}
            onClick={handleClick}
        >
            {children || value}
        </button>
    )
}