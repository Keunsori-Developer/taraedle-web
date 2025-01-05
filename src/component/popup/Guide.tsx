import { Transition } from "@headlessui/react";
import classNames from "classnames";
import successImage from '../../asset/taraedle-congrat.gif';
import '../style/style.css'
import { wordInfo } from "../../lib/words";

export const ResultPopup = (isOpen: boolean) => {
    
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
            <div>
                <h1>게임 설명</h1>
                <span style={{color: 'green'}}>초록색</span>
            </div>
        </Transition>
    )
}