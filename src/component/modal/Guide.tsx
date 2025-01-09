import { Transition } from "@headlessui/react";
import '../style/style.css'
import ex1 from '../../asset/ex1.png'
import ex2 from '../../asset/ex2.png'
import ex3 from '../../asset/ex3.png'
import { modal } from "../../constant/type";

export const Guide = ({ isOpen, isClose }: modal) => {
    
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
            <div className="infoBox" style={{backgroundColor: '#f0f0f0'}}>
                <div className="fit">
                <div style={{width: '100%', marginTop: '1rem', textAlign: 'right'}}>
                    <button style={{fontWeight: 'bold'}} onClick={isClose}>X</button>
                </div>
                    <h1 style={{fontSize: '250%', margin: '0.5rem auto 1rem'}}>게임 설명</h1>
                    <p style={{textAlign: 'left'}}>
                        <span style={{ color: '#658C5E' }}>초록색</span> 이라면<br />
                        : 표시된 자모가 정확히 같은 위치에 위치해요.<br />
                        <span style={{ color: '#C0994E' }}>노란색</span> 이라면<br />
                        : 표시된 자모가 존재하지만 해당 위치는 아니에요.<br />
                        <span style={{ color: '#999999' }}>회색</span> 이라면<br />
                        : 해당 자모는 단어에 포함되지 않아요.
                    </p>
                    <br />
                    <p style={{ textAlign: 'left' }}>정답 단어가 '인사'인 경우</p>
                    <div className="fit">
                        <img style={{ margin: '1rem auto' }} src={ex1} />
                        <p style={{textAlign: 'left'}}>
                            'ㅏ'가 정확히 다섯 번째 자모에 위치해요.<br />
                            나머지 자모들은 단어에 포함되지 않아요.
                        </p>
                        <img style={{ margin: '1rem auto' }} src={ex2} />
                        <p style={{textAlign: 'left'}}>
                            'ㅇ'과 'ㅣ'가 단어에는 포함되지만,<br />
                            정확한 위치에 있지는 않아요.
                        </p>
                        <img style={{ margin: '1rem auto' }} src={ex3} />
                        <p style={{marginBottom: '2rem', textAlign: 'left'}}>
                            모든 자모가 완벽히 제 자리에 위치해 있어요.<br />
                            문제 풀이 성공!
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
    )
}