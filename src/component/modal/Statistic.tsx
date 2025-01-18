import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { getStatistic } from "../../lib/auth";
import { StatusInfo } from "../../constant/type";

interface props {
    isOpen: boolean,
    isClose: () => void
}

const Statistic = ({ isOpen, isClose }: props) => {
    const [status, setStatus] = useState<StatusInfo>({});

    useEffect(() => {
        console.log('token check');
        getStatistic();
    }, [localStorage.getItem('accesToken')]);
    
    useEffect(() => {
        const data = localStorage.getItem('statusInfo');
        if (data) {
            const statInfo = JSON.parse(data);
            setStatus(statInfo)
            console.log(statInfo);
        }
    }, [localStorage.getItem('statusInfo')])

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
                총 풀이횟수 : {status.solveCount}<br />
                최근 풀이 일자 : {status.lastSolve}<br />
                연속 풀이횟수 : {status.solveStreak}<br />
                
                <button className="select" onClick={() => { isClose() }}>닫기</button>
            </div>
        </Transition>
    )
}

export default Statistic;