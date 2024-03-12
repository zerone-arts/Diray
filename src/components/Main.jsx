import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/main.css";
import ColorEdit from "./edit/ColorEdit";
import OneWordEdit from "./edit/OneWordEdit";
import TitleEdit from "./edit/TitleEdit";
import TextEdit from "./edit/TextEdit";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebase";

function Main({
  count,
  setCount,
  monthList,
  userData,
  editActive,
  setEditActive,
  theme,
}) {
  const [bookWidth, setBookWidth] = useState(220);

  const [width, setWidth] = useState(document.documentElement.clientWidth);
  const [widthSort, setWidthSort] = useState("");
  const [slideWidth, setSlideWidth] = useState(width / 2 - bookWidth / 2);
  const [mouseActive, setMouseACtive] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [slideBoxTransition, setSlideBoxTransition] = useState("1s");
  const [sort, setSort] = useState("slide");

  const [colorEditActive, setColorEditActive] = useState(false);
  const [oneWordEditActive, setOneWordEditActive] = useState(false);
  const [titleEditActive, setTitleEditActive] = useState(false);
  const [textEditActive, setTextEditActive] = useState(false);
  const [presentColor, setPresentColor] = useState("");
  const [presentOneWord, setPresentOneWord] = useState("");
  const [presentTitle, setPresentTitle] = useState("");
  const [presentText, setPresentText] = useState("");
  const [oneWord, setOneWord] = useState([]);

  let navigate = useNavigate();

  let test = [
    {
      id: 1,
      name: "January",
      abbreviation: "Jan",
      color: "255,255,255",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 2,
      name: "February",
      abbreviation: "Feb",
      color: "255,197,179",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 3,
      name: "March",
      abbreviation: "Mar",
      color: "250,161,168",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 4,
      name: "April",
      abbreviation: "Apr",
      color: "135,177,110",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 5,
      name: "May",
      abbreviation: "May",
      color: "255,211,59",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 6,
      name: "Jone",
      abbreviation: "Jun",
      color: "84,206,193",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 7,
      name: "July",
      abbreviation: "Jul",
      color: "36,173,211",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 8,
      name: "August",
      abbreviation: "Aug",
      color: "206,84,88",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 9,
      name: "September",
      abbreviation: "Sep",
      color: "218,119,82",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 10,
      name: "October",
      abbreviation: "Oct",
      color: "209,150,128",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 11,
      name: "November",
      abbreviation: "Nov",
      color: "62,126,144",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
    {
      id: 12,
      name: "December",
      abbreviation: "Dec",
      color: "167,106,197",
      oneWord: "one word",
      title: "hellow",
      text: "I'm making a diary web app",
    },
  ];

  const editHandle = () => {
    if (editActive === "") {
      setEditActive("active");
    } else if (editActive === "active") {
      setEditActive("");
      saveHandle();
    }
  };

  const cancelHandle = async () => {
    setEditActive("");

    setPresentColor("");
    setPresentOneWord("");
    setPresentTitle("");
    setPresentText("");
  };

  const saveHandle = async () => {
    try {
      let editMonthList = userData?.monthData;

      editMonthList[count - 1].color =
        presentColor === ""
          ? userData?.monthData[count - 1].color
          : presentColor;
      editMonthList[count - 1].oneWord =
        presentOneWord === ""
          ? userData?.monthData[count - 1].oneWord
          : presentOneWord;
      editMonthList[count - 1].title =
        presentTitle === ""
          ? userData?.monthData[count - 1].title
          : presentTitle;
      editMonthList[count - 1].text =
        presentText === "" ? userData?.monthData[count - 1].text : presentText;
      const washingtonRef = doc(db, "diary", localStorage.getItem("user"));
      updateDoc(washingtonRef, {
        monthData: editMonthList,
      });
      setOneWord(editMonthList);
    } catch (error) {
      console.log(error);
    }

    setPresentColor("");
    setPresentOneWord("");
    setPresentTitle("");
    setPresentText("");
  };

  const mouseDownHandle = (e) => {
    setSlideBoxTransition("1s");
    setMouseACtive(true);
    setMouseX(e.pageX);
  };
  const mouseMoveHandle = (e) => {
    if (mouseActive) {
      if (e.pageX > mouseX) {
        setCount((prev) => prev - 1);
        setMouseACtive(false);
      } else if (e.pageX < mouseX) {
        setCount((prev) => prev + 1);
        setMouseACtive(false);
      }
    }
  };

  const mouseUpHandle = (e) => {
    setMouseACtive(false);
    if (editActive !== "active") {
      if (mouseX === e.pageX) {
        navigate("/month");
      }
    }
  };

  const btnHandle = () => {
    if (sort === "slide") {
      setSort("sort");
      setBookWidth(154);
      setSlideWidth(width / 2 - 462);
      setCount(0);
    } else {
      setSort("slide");
      setBookWidth(220);
      setCount(1);
    }
  };

  useEffect(() => {
    if (sort === "slide") {
      if (count === 1) {
        setSlideWidth(width / 2 - bookWidth / 2);
      } else if (count > 1) {
        setSlideWidth(width / 2 - bookWidth / 2 - bookWidth * (count - 1));
      }
    } else {
      setSlideWidth(width / 2 - 462);
      if (width < 768) {
        setWidthSort("width-768");
        setSlideWidth(width / 2 - 231);
      } else if (width > 768) {
        setWidthSort("");
      }
    }
  }, [width, count]);

  useEffect(() => {
    setOneWord(userData?.monthData);
  }, [userData]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(document.documentElement.clientWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(document.documentElement.clientWidth);
      });
    };
  }, []);

  return (
    <div className={`main-container ${editActive} ${theme}`}>
      <div className="main-slide-Wrapper">
        <ul
          className={`main-slide-box ${sort} ${widthSort}`}
          style={
            sort === "slide"
              ? {
                  transform: `translateX(${slideWidth}px)`,
                  transition: slideBoxTransition,
                }
              : {
                  transform: `translateX(${slideWidth}px)`,
                  transition: slideBoxTransition,
                }
          }
        >
          {userData?.monthData.map((item, idx) => {
            return (
              <li
                className="main-slide-list"
                key={idx}
                onMouseDown={(e) => mouseDownHandle(e)}
                onMouseUp={(e) => mouseUpHandle(e)}
                onMouseMove={(e) => mouseMoveHandle(e)}
                style={
                  editActive === "active"
                    ? count === idx + 1
                      ? { opacity: 1 }
                      : { opacity: 0 }
                    : { opacity: 1 }
                }
              >
                <button
                  className={`main-slide-book-edit-color ${editActive}`}
                  style={
                    count === idx + 1
                      ? {
                          backgroundColor: `rgba(${
                            presentColor === "" ? item.color : presentColor
                          })`,
                        }
                      : { opacity: 0 }
                  }
                  onClick={() => setColorEditActive(true)}
                ></button>
                <div
                  className={`main-slide-month ${theme}`}
                  style={
                    count === idx + 1
                      ? {
                          transform: `scale(1)`,
                          backgroundColor: `rgba(${
                            presentColor === "" ? item.color : presentColor
                          },1)`,
                        }
                      : {
                          transform: `scale(0.9)`,
                          backgroundColor: `rgba(${item.color},1)`,
                        }
                  }
                >
                  <div className={`main-slide-moonth-book ${sort}`}>
                    <h2
                      style={{
                        textShadow: `2px 2px 3px rgba(${
                          presentColor === "" ? item.color : presentColor
                        }, 0.5)`,
                      }}
                    >
                      {item.name}
                    </h2>
                    <h5>
                      <span
                        style={
                          item.oneWord === ""
                            ? { display: "none" }
                            : { display: "inline-block" }
                        }
                      >
                        "
                      </span>
                      {presentOneWord === "" ? item.oneWord : presentOneWord}
                      <span
                        style={
                          item.oneWord === ""
                            ? { display: "none" }
                            : { display: "inline-block" }
                        }
                      >
                        "
                      </span>
                      <button
                        className={`main-slide-book-edit-oneWord ${editActive}`}
                        style={
                          editActive === ""
                            ? count === idx + 1
                              ? { opacity: 0 }
                              : { opacity: 0 }
                            : count === idx + 1
                            ? { opacity: 1 }
                            : { opacity: 0 }
                        }
                        onClick={() => setOneWordEditActive(true)}
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </h5>
                    <h4>2024</h4>
                  </div>
                  <div
                    className="main-slide-moonth-book-style"
                    style={{ backgroundColor: item.color }}
                  >
                    <div className="main-slide-moonth-book-style-line"></div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className={`main-textBox ${sort} ${theme}`}>
        {userData?.monthData.map((item, idx) => {
          return (
            <li
              key={idx}
              style={count === idx + 1 ? { opacity: 1 } : { opacity: 0 }}
            >
              <h3>
                {presentTitle === "" ? item.title : presentTitle}
                <button
                  className={`main-textBox-edit-title ${editActive}`}
                  style={
                    editActive === ""
                      ? count === idx + 1
                        ? { opacity: 0 }
                        : { opacity: 0 }
                      : count === idx + 1
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  onClick={() => setTitleEditActive(true)}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </h3>
              <p>
                {presentText === "" ? item.text : presentText}
                <button
                  className={`main-textBox-edit-text ${editActive}`}
                  style={
                    editActive === ""
                      ? count === idx + 1
                        ? { opacity: 0 }
                        : { opacity: 0 }
                      : count === idx + 1
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                  onClick={() => setTextEditActive(true)}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </p>
            </li>
          );
        })}
      </ul>
      <div className={`main-editBox ${sort}`}>
        <button onClick={editHandle}> {editActive === "" ? "" : "save"}</button>
        <button onClick={cancelHandle}>
          {editActive === "" ? "" : "cancel"}
        </button>
      </div>

      <div
        className={`main-btn ${sort} ${theme}`}
        onClick={btnHandle}
        style={
          editActive === ""
            ? { opacity: 1, pointerEvents: "all" }
            : { opacity: 0, pointerEvents: "none" }
        }
      >
        <div className="main-btnItem"></div>
        <div className="main-btnItem"></div>
        <div className="main-btnItem"></div>
        <div className="main-btnItem"></div>
      </div>
      <ColorEdit
        monthList={monthList}
        colorEditActive={colorEditActive}
        setColorEditActive={setColorEditActive}
        setPresentColor={setPresentColor}
      />
      <OneWordEdit
        oneWordEditActive={oneWordEditActive}
        setOneWordEditActive={setOneWordEditActive}
        setPresentOneWord={setPresentOneWord}
      />
      <TitleEdit
        titleEditActive={titleEditActive}
        setTitleEditActive={setTitleEditActive}
        setPresentTitle={setPresentTitle}
      />
      <TextEdit
        textEditActive={textEditActive}
        setTextEditActive={setTextEditActive}
        setPresentText={setPresentText}
      />
    </div>
  );
}

export default Main;
