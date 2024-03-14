import React, { useState, useEffect } from "react";

import "../assets/css/Login.css";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";

function Login({ setLogin, getUidHandle }) {
  const navigate = useNavigate();
  const HandleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        localStorage.setItem("user", data.user.uid);
        localStorage.setItem(
          "userProfile",
          JSON.stringify({
            email: data.user.email,
            img: data.user.photoURL,
          })
        );

        setLogin(true);
        newUserCreate(data.user);
        getUidHandle(data.user.uid);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newUserCreate = async (user) => {
    const docRef = doc(db, "diary", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.data()) {
      await setDoc(doc(db, "diary", user.uid), {
        email: user.email,
        img: user.photoURL,
        monthData: [
          {
            id: 1,
            name: "January",
            abbreviation: "Jan",
            color: "255,255,255",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 2,
            name: "February",
            abbreviation: "Feb",
            color: "255,197,179",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 3,
            name: "March",
            abbreviation: "Mar",
            color: "250,161,168",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 4,
            name: "April",
            abbreviation: "Apr",
            color: "135,177,110",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 5,
            name: "May",
            abbreviation: "May",
            color: "255,211,59",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 6,
            name: "Jone",
            abbreviation: "Jun",
            color: "84,206,193",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 7,
            name: "July",
            abbreviation: "Jul",
            color: "36,173,211",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 8,
            name: "August",
            abbreviation: "Aug",
            color: "206,84,88",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 9,
            name: "September",
            abbreviation: "Sep",
            color: "218,119,82",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 10,
            name: "October",
            abbreviation: "Oct",
            color: "209,150,128",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 11,
            name: "November",
            abbreviation: "Nov",
            color: "62,126,144",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
          {
            id: 12,
            name: "December",
            abbreviation: "Dec",
            color: "167,106,197",
            oneWord: "one word",
            title: " title ",
            text: " A word representing this month ",
          },
        ],
        monthDayData: {
          Jan: [],
          Feb: [],
          Mar: [],
          Apr: [],
          May: [],
          Jun: [],
          Jul: [],
          Aug: [],
          Sep: [],
          Oct: [],
          Nov: [],
          Dec: [],
        },
      });
    }
    getUidHandle(user.uid);
  };
  return (
    <div className="login-container">
      <div className="login-loginBox">
        <div className="login-loginBox-title">a word of the day</div>
        <div className="login-loginBox-designBox">
          <div className="login-loginBox-designBox-color1Box">
            <div
              className="login-loginBox-designBox-colorBox-color"
              style={{ backgroundColor: "#18383f" }}
            ></div>
            <div className="login-loginBox-designBox-colorBox-hex">#18383f</div>
            <p className="login-loginBox-designBox-colorBox-text">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <div className="login-loginBox-designBox-color2Box">
            <div
              className="login-loginBox-designBox-colorBox-color"
              style={{ backgroundColor: "#aebdc0" }}
            ></div>
            <div className="login-loginBox-designBox-colorBox-hex">#aebdc0</div>
            <p className="login-loginBox-designBox-colorBox-text">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
        <div className="login-loginBox-inputBox">
          <button
            className="login-loginBox-inputBox-btn"
            onClick={HandleGoogleLogin}
          >
            <p>Sign in with Google</p>
            <div className="login-loginBox-inputBox-line"></div>
            <div className="login-loginBox-inputBox-ball"></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
