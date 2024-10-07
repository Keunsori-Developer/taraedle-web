import titleImg from '../asset/title.png'
import { Button } from "../component/button/Button";

export const MainPage = () => {
    return (
        <div>
            <img style={{ margin: '100px auto 100px auto' }} src={titleImg} />
            <Button value="게임시작" onClick={() => {window.location.href = '/problem'}}/>
            <Button value="챌린지" onClick={() => { }}/>
            <Button value="설정" onClick={() => { }} />
            <Button value="로그인" onClick={() => {
                window.open('/login', '로그인', 'width=430,height=500,location=no,status=no,scrollbars=yes')
            }} />
        </div>
    )
}