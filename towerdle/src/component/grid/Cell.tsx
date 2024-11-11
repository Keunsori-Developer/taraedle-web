import classnames from "classnames";
import inputCell from '../../asset/inputCell_default.svg'

type Props = {
    value?: string,
    status?: any
}

export const Cell = ({ value, status }: Props) => {
    const classes = classnames(
        'w-14 h-14 flex items-center justify-center text-lg font-bold rounded',
        {
            'bg-white border-slate-200': !status,
            'border-black': value && !status,
            'bg-slate-400 text-white border-slate-400': status === 'absent',
            'bg-purple-500 text-white border-purple-500': status === 'correct',
            'bg-orange-500 text-white border-orange-500': status === 'present',
            // 'bg-default': !status,
            // 'bg-absent': status === 'absent',
            // 'bg-correct': status === 'correct',
            // 'bg-present': status === 'present',
            'cell-animation': !!value,
        }
    )

    const style = {
        backgroundImage: `url(${inputCell})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        border: 'none'
    }

    return <div className={classes} style={style}>
        {value}</div>
}