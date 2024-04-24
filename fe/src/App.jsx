import React, { useEffect } from "react";
import app from "./firebase";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./loginPage/LoginPage";
import RegisterPage from "./registerPage/RegisterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "./store/userSlice";
import TestPage from "./testPage/TestPage";
import CodeTestPage from "./testPage/CodeTestPage";
import SurveyPage from "./surveyPage/SurveyPage";
import MyPage from "./myPage/MyPage";
import TeamSpacePage from "./teamspacePage/TeamSpacePage";
import CommunityMainPage from "./communityPage/CommunityMainPage";
import CreatePost from "./communityPage/createPost/CreatePage";

import "./fonts/Font.css"
import TeamSpaceDetailPage from "./teamSpaceDetailPage/teamSpaceDetailPage";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
          })
        );
      } else {
        navigate("/login");
        dispatch(clearUser());
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/' element={<TestPage/>}/>
      <Route path='/codetest' element={<CodeTestPage/>}/>
      <Route path='/survey' element={<SurveyPage/>}/>
      <Route path='/mypage' element={<MyPage/>}/>
      <Route path="/TeamSpacePage" element={<TeamSpacePage />} />
<<<<<<< HEAD
      <Route path="/communityMainPage" element={<CommunityMainPage/>}/>
      <Route path="/createPost" element={<CreatePost/>}/>
=======
      <Route path="/TeamSpaceDetailPage" element={<TeamSpaceDetailPage />} />
>>>>>>> fe/feat/team
    </Routes>
  );
};

export default App;
