import { Transition } from "@headlessui/react";
import classNames from "classnames";
import successImage from '../../asset/taraedle-congrat.gif';
import '../style/style.css'
import { wordInfo } from "../../lib/words";

type props = {
    isOpen: boolean,
    leftFunction: () => void,
    rightFunction: () => void,
    title: string,
    info: wordInfo,
    lBtn: string,
    rBtn: string
}

export const ResultPopup = ({ isOpen, leftFunction, rightFunction, title, info, lBtn, rBtn }: props) => {
    const titleStyle = classNames(
        'title',
        {
            'success': title === '정답',
            'fail': title === '오답'
        }
    )
    
    return (
        <Transition
            show={isOpen}
            enter="ease-out duration-300 transition"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="resultBox">
                <span className={titleStyle}>{title}</span>
                {title === '정답' ? <img src={successImage} className="successImg"/> : <br/>}
                {info.value}<br/>
                <div>
                    <br/>
                    {info.definitions.map((mean) => (
                        <div>
                            <div>
                                {mean.pos}
                            </div>
                            {mean.meanings.map((meaning) => (
                                <div>
                                    {meaning}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <br/>
                <div className="footer">
                    <button onClick={leftFunction}>{lBtn}</button>
                    <button onClick={rightFunction}>{rBtn}</button>
                </div>
            </div>
            
        </Transition>
    )
}