import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import app from "../firebase";
import { clearUser } from "../store/userSlice";
import ChatBot from "../components/chatbot/ChatBot";
import { useNavigate } from "react-router-dom";

const TestPage = () => {

    const userInfo = useSelector(state => (state.user))
    const auth = getAuth(app);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch(clearUser());
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const redirectToGithub = () => {
        //window.location.href = "https://k10e103.p.ssafy.io/api/oauth2/authorization/github";
        window.location.href = "localhost:8080/api/oauth2/authorization/github";
    };

    return (
        <div style={{ padding: '5rem' }}>
            <div>
                <h1>TestPage</h1>
                <p> Your Name is {userInfo.currentUser.displayName}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button onClick={handleLogout}>This button is logout function</button>
                <button onClick={() => navigate('/survey')}>설문 페이지</button>
                <button onClick={() => navigate('/mypage')}>마이 페이지</button>
                <button onClick={() => navigate('/TeamSpacePage')}>팀스페이스 페이지</button>
                <button onClick={() => navigate('/project')}>프로젝트 페이지</button>
                <button onClick={() => navigate('/communityMainPage', { state: { kind: "member" } })}>커뮤니티</button>
                <button onClick={() => navigate('/TeamSpaceDetailPage')}>팀스페이스 디테일 페이지</button>
                <button onClick={() => navigate('/Mainpage')}>메인페이지</button>
                <button onClick={() => navigate('/rtc')}>rtc</button>
                <button onClick={() => navigate('/login')}>로그인 페이지</button>
                <button onClick={() => redirectToGithub()}>oauth2 로그인 페이지</button>
                <button onClick={() => navigate("/oauth2/authorization/github/client_id=218c974f1409ed1c47b2")}>Github</button>
                <button onClick={() => navigate("/oauthTest")}>oauth 토큰 test</button>
            
            </div>
        </div>
    )
}

export default TestPage