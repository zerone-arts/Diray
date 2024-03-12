import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Login from "./components/Login";
import Month from "./components/Month";
import UserProfile from "./components/UserProfile";
import NotFoundPage from "./components/NotFoundPage";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "./firebase";

function App() {
  let date = new Date();

  const [login, setLogin] = useState(false);
  const [count, setCount] = useState(date.getMonth() + 1);
  const [editActive, setEditActive] = useState("");
  const [theme, setTheme] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  const getUidHandle = async (uid) => {
    const docRef = doc(db, "diary", uid);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data());
  };

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    setUserProfile(localStorage.getItem("userProfile"));
    if (localStorage.getItem("user")) {
      getUidHandle(localStorage.getItem("user"));

      setLogin(true);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="App">
      <ul
        className={`main-header ${theme}`}
        style={login ? { display: "flex" } : { display: "none" }}
      >
        <li className="main-header-logo">
          <Link to={"/"} className="main-header-logo-link">
            one word .
          </Link>
        </li>
        <li className="main-header-login">
          <UserProfile
            setEditActive={setEditActive}
            setLogin={setLogin}
            userData={userData}
            theme={theme}
            setTheme={setTheme}
          />
        </li>
      </ul>

      <Routes>
        <Route
          path="/"
          element={
            <Main
              count={count}
              setCount={setCount}
              userData={userData}
              editActive={editActive}
              setEditActive={setEditActive}
              theme={theme}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={<Login setLogin={setLogin} getUidHandle={getUidHandle} />}
        ></Route>
        <Route
          path="/month"
          element={<Month count={count} theme={theme} userData={userData} />}
        ></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
