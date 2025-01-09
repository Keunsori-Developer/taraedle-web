import { Transition } from "@headlessui/react";
import React from "react";
import { getStatistic } from "../../lib/auth";

interface props {
    isOpen: boolean,
    isClose: () => void
}

const Statistic = ({ isOpen, isClose }: props) => {
    const value = getStatistic();
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
            <div className="infoBox">

                <button className="select" onClick={() => { isClose() }}>닫기</button>
            </div>
        </Transition>
    )
}

export default Statistic;