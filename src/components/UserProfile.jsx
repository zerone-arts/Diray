import React, { useEffect, useRef, useState } from "react";
import "../assets/css/UserProfile.css";
import { useNavigate } from "react-router-dom";

function UserProfile({ setEditActive, setLogin, theme, setTheme, userData }) {
  const [active, setActive] = useState("");
  const userProfileRef = useRef(null);
  const profileRef = useRef(null);
  const editRef = useRef(null);
  const lorem1Ref = useRef(null);
  const lorem2Ref = useRef(null);
  const logoutRef = useRef(null);
  const [hover, setHover] = useState(profileRef);
  const [ball, setBall] = useState(13);
  const [menuTop, setMenuTop] = useState(0);
  const navigate = useNavigate();

  const themeHandle = () => {
    theme === "" ? setTheme("dark") : setTheme("");
  };

  const logOutHandle = () => {
    setLogin(false);
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    navigate("login");
  };

  useEffect(() => {
    setMenuTop(userProfileRef.current?.getBoundingClientRect().top);
    setBall(hover.current?.getBoundingClientRect().top - menuTop + 13);
  }, [hover, menuTop]);

  useEffect(() => {
    setMenuTop(userProfileRef.current?.getBoundingClientRect().top);
    setBall(hover.current?.getBoundingClientRect().top - menuTop + 13);
    window.addEventListener("resize", resizeHandle);
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

  return (
    <div className={`userprofile-container ${active}`} ref={userProfileRef}>
      <div
        className="userprofile-profile"
        ref={profileRef}
        style={userData ? { opacity: 1 } : { opacity: 0 }}
      >
        <div className="userprofile-profile-theme">
          <div
            className={`userprofile-profile-theme-light ${theme}`}
            onClick={themeHandle}
          >
            <ion-icon name="sunny-outline"></ion-icon>
          </div>
          <div
            className={`userprofile-profile-theme-dark ${theme}`}
            onClick={themeHandle}
          >
            <ion-icon name="moon-outline"></ion-icon>
          </div>
        </div>
        <div className="userprofile-profile-img">
          <img
            src={userData?.img}
            alt="login.email"
            referrerPolicy="no-referrer"
          />
        </div>
        <p
          className="userprofile-profile-name"
          onClick={() =>
            active === "active" ? setActive("") : setActive("active")
          }
        >
          {(userData?.email || "").split("@")[0]}
        </p>
      </div>
      <ul className={`userprofile-menu ${theme}`}>
        <li
          ref={editRef}
          onMouseOver={() => setHover(editRef)}
          onMouseOut={() => {
            setHover(profileRef);
          }}
          onClick={() => {
            setEditActive("active");
          }}
        >
          <button className="useprofile-menu-btn">Edit</button>
        </li>

        <li
          ref={logoutRef}
          onMouseOver={() => setHover(logoutRef)}
          onMouseOut={() => {
            setHover(profileRef);
          }}
        >
          <button className="useprofile-menu-btn" onClick={logOutHandle}>
            logout
          </button>
        </li>
      </ul>

      <div className={`uerprofile-line ${theme}`}></div>
      <div className={`uerprofile-ball ${theme}`} style={{ top: ball }}></div>
    </div>
  );
}

export default UserProfile;
