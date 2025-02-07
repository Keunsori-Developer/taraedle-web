import { Transition } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { getStatistic } from "../../lib/auth";
import { StatusInfo } from "../../constant/type";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import '../../index.css'

interface props {
    isOpen: boolean,
    isClose: () => void
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
ChartJS.defaults.font.family = 'Rix X ladywatermelon Regular'

const Statistic = ({ isOpen, isClose }: props) => {
    const [status, setStatus] = useState<StatusInfo>({});
    const [count, setCount] = useState<number[]>();

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            getStatistic();
        }
    }, [localStorage.getItem('accesToken')]);
    
    // 로그인 후 생성된 localstorage로 인해 통계 세팅됨

    useEffect(() => {
        const data = localStorage.getItem('statusInfo');
        if (data) {
            const statInfo = JSON.parse(data);
            setStatus(statInfo)
            setCount([
                status.detailedStats?.EASY?.totalSolved ? status.detailedStats?.EASY?.totalSolved : 0,
                status.detailedStats?.MEDIUM?.totalSolved ? status.detailedStats?.MEDIUM?.totalSolved : 0,
                status.detailedStats?.HARD?.totalSolved ? status.detailedStats?.HARD?.totalSolved : 0,
                status.detailedStats?.VERYHARD?.totalSolved ? status.detailedStats?.VERYHARD?.totalSolved : 0,
            ])
            // console.log(statInfo);
        }
    }, [localStorage.getItem('statusInfo')])

    // solveCount?: number,
    // lastSolve?: string,
    // solveStreak?: number,
    // detailedStats?: {
    //     EASY?: SolveLevelCount,
    //     MEDIUM?: SolveLevelCount,
    //     HARD?: SolveLevelCount,
    //     VERYHARD?: SolveLevelCount
    // }

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
                <h1 style={{ fontSize: "1.2rem" }}>통계</h1>
                <br />
                <div style={{textAlign: "left", width: "80%"}}>
                    총 풀이횟수 : {status.solveCount}<br />
                    최근 풀이 일자 : {status.lastSolve}<br />
                    연속 풀이횟수 : {status.solveStreak}<br />
                </div>
                

                <Bar
                    data={{
                        labels: ['쉬움', '보통', '어려움', '매우어려움'],
                        datasets: [
                            {
                                // label: 'Dataset 1',
                                data: count,
                                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            },
                        ],
                    }}
                    options={{
                        indexAxis:'y',
                        responsive: true,
                        // plugins: {
                            //     title: {
                                //         display: true,
                                //         text: 'Bar Chart Example'
                                //     }
                                // }
                } }/>
                <button className="select" onClick={() => { isClose() }}>닫기</button>
            </div>
        </Transition>
    )
}

export default Statistic;