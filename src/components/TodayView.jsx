import React, { useEffect, useRef, useState } from "react";
import "../assets/css/TodayView.css";
import testImg from "../assets/img/testImg.JPG";
import axios from "axios";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebase";
function TodayView({
  todayActive,
  setTodayActive,
  selectDay,
  abbr,
  setNewDay,
  userData,
}) {
  const [edit, setEdit] = useState("");
  const [editSelect, setEditSelect] = useState("");
  const [ratio, setRatio] = useState("center");
  const [color, setColor] = useState("#ffffff");
  const [bright, setBright] = useState(50);
  const [brightActive, setBrightActive] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [text, setText] = useState("");
  const [textWidth, setTextWidth] = useState(null);
  const [textMoveActive, setTextMoveActive] = useState(false);
  const [textBoxX, setTextBoxX] = useState(null);
  const [textBoxY, setTextBoxY] = useState(null);

  const [dayEditSaveList, setDayEditSaveList] = useState({
    day: "",
    text: "",
    textBoxX: "",
    textBoxY: "",
    color: "",
    img: "",
    ratio: "",
    bright: "",
  });
  const [monthAllList, setMonthAllList] = useState({});

  const brightRef = useRef(null);
  const textWidthRef = useRef(null);
  const inputRef = useRef(null);
  const textBoxMoveRef = useRef(null);
  const ratioRef = useRef(null);

  const squareList = ["center", "row", "column"];

  const onChangeHandle = (e) => {
    setText(e.target.value);
    console.log(text);
  };
  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  const textMoveHandle = (e) => {
    if (textMoveActive) {
      if (ratio === "center") {
        setTextBoxX(e.clientX - 200 + textWidth / 2);
        setTextBoxY(e.clientY - 200);
      } else if (ratio === "row") {
        setTextBoxX(e.clientX - 175 + textWidth / 2);
        setTextBoxY(e.clientY - 225);
      } else if (ratio === "column") {
        setTextBoxX(e.clientX - 210 + textWidth / 2);
        setTextBoxY(e.clientY - 190);
      }
    }
  };

  const todayActiveHandle = () => {
    if (edit === "") {
      setTodayActive("");
    }
    if (editSelect === "text") {
      setEditSelect("");
    }
  };

  const removeHandle = async () => {
    setText("hello");
    setTextBoxX(null);
    setTextBoxY(null);
    setColor("#ffffff");
    setImgSrc("");
    setRatio("center");
    setBright(50);

    let allList = monthAllList;

    let prevObj = allList[abbr].findIndex((obj) => obj.day === selectDay);

    allList[abbr].splice(prevObj, 1);
    setMonthAllList(allList);
  };

  console.log(text);

  const saveHandle = async () => {
    setEdit("");
    if (editSelect !== "remove") {
      let editList = dayEditSaveList;
      editList.day = selectDay;
      editList.text = text;
      editList.textBoxX = textBoxX;
      editList.textBoxY = textBoxY;
      editList.color = color;
      editList.img = imgSrc;
      editList.ratio = ratio;
      editList.bright = bright;
      setDayEditSaveList(editList);

      let allList = monthAllList;

      let prevObj;
      prevObj = monthAllList[abbr]?.findIndex((obj) => obj.day === selectDay);

      if (prevObj >= 0) {
        console.log("수정 !");

        allList[abbr][prevObj].text = text;
        allList[abbr][prevObj].textBoxX = textBoxX;
        allList[abbr][prevObj].textBoxY = textBoxY;
        allList[abbr][prevObj].color = color;
        allList[abbr][prevObj].img = imgSrc;
        allList[abbr][prevObj].ratio = ratio;
        allList[abbr][prevObj].bright = bright;
      } else {
        console.log("추가 !");
        allList[abbr].push(dayEditSaveList);
      }
      const washingtonRef = doc(db, "diary", localStorage.getItem("user"));
      updateDoc(washingtonRef, {
        monthDayData: allList,
      });

      setMonthAllList(allList);
    }

    getData();
    setNewDay(true);
  };

  const getData = async () => {
    if (selectDay) {
      let idx = monthAllList[abbr]?.findIndex((obj) => obj.day === selectDay);
      if (idx >= 0) {
        setText(monthAllList[abbr][idx].text);
        setTextBoxX(monthAllList[abbr][idx].textBoxX);
        setTextBoxY(monthAllList[abbr][idx].textBoxY);
        setColor(monthAllList[abbr][idx].color);
        setImgSrc(monthAllList[abbr][idx].img);
        setRatio(monthAllList[abbr][idx].ratio);
        setBright(monthAllList[abbr][idx].bright);
      } else {
        setText("hello");
        setTextBoxX(null);
        setTextBoxY(null);
        setColor("#ffffff");
        setImgSrc("");
        setRatio("center");
        setBright(50);
      }
    }
  };

  const cancelHandle = () => {
    setEdit("");
    getData();
  };

  const brightHandle = (e) => {
    let boxBottom = brightRef.current?.getBoundingClientRect().bottom;
    let boxTop = brightRef.current?.getBoundingClientRect().top;
    if (brightActive) {
      let percent =
        100 -
        ((brightRef.current?.getBoundingClientRect().top - e.clientY) /
          (boxBottom - boxTop)) *
          -100;
      if (percent <= 100) {
        setBright(
          100 -
            ((brightRef.current?.getBoundingClientRect().top - e.clientY) /
              (boxBottom - boxTop)) *
              -100
        );
      }
    }
  };

  useEffect(() => {
    setTextWidth(textWidthRef.current?.getBoundingClientRect().width);
  }, [text]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [selectDay]);

  useEffect(() => {
    setMonthAllList(userData?.monthDayData);
  }, [userData]);

  return (
    <div className={`todayView-container ${todayActive}`}>
      <span className="todayView-textWdith" ref={textWidthRef}>
        {text}
      </span>
      <div className={`todayView-wrapper ${todayActive}`}>
        {squareList.map((item, idx) => {
          return (
            <div
              key={idx}
              className={`square-Box ${item}`}
              onClick={todayActiveHandle}
              style={
                ratio === item ? { display: "block" } : { display: "none" }
              }
            >
              {imgSrc === "" ? (
                <div
                  className="square-Box-notImgBox"
                  style={
                    edit === "editActive"
                      ? { border: `0.5px solid white` }
                      : { border: `none` }
                  }
                ></div>
              ) : (
                <img
                  src={imgSrc}
                  alt=""
                  style={
                    edit === "editActive"
                      ? {
                          border: `0.5px solid white`,
                          filter: `brightness(${bright}%)`,
                        }
                      : { border: `none`, filter: `brightness(${bright}%)` }
                  }
                />
              )}
              <div
                className="squre-Box-textBox"
                onMouseMove={(e) => textMoveHandle(e)}
                onMouseUp={() => setTextMoveActive(false)}
                ref={ratioRef}
              >
                <div
                  className={`squre-Box-textBox-textWrapper ${editSelect}`}
                  style={
                    textBoxX === null
                      ? { width: `${textWidth + 10}px` }
                      : {
                          width: `${textWidth + 10}px`,
                          left: `${textBoxX}px`,
                          top: `${textBoxY}px`,
                          transform: `translate(0%,0%)`,
                        }
                  }
                >
                  <input
                    className={`squre-Box-textBox-text ${editSelect}`}
                    type="text"
                    value={text || ""}
                    style={{ width: `${textWidth}px`, color: color }}
                    onChange={(e) => onChangeHandle(e)}
                    ref={inputRef}
                  ></input>

                  <div className="squre-Box-textBox-move" ref={textBoxMoveRef}>
                    <ion-icon
                      name="move-outline"
                      style={
                        textMoveActive
                          ? { color: color, opacity: 1 }
                          : { color: color, opacity: 0.5 }
                      }
                      onMouseDown={() => setTextMoveActive(true)}
                    ></ion-icon>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className={`todayView-BtnBox ${ratio} ${edit}`}>
          <button
            className={`todayView-editBtn ${edit}`}
            onClick={() => {
              edit === "" ? setEdit("editActive") : setEdit("");
            }}
          >
            edit
          </button>
          <ul className={`todayView-save-cancel-Box ${edit}`}>
            <li className="todayView-saveBtn" onClick={saveHandle}>
              save
            </li>
            <li className="todayView-cancelBtn" onClick={cancelHandle}>
              cancel
            </li>
          </ul>
        </div>
        <div className={`todayView-editBox ${ratio} ${edit}`}>
          <ul className="todayView-editBox-leftBox">
            <li
              className={`todayView-editBox-leftBox-textEdit ${editSelect}`}
              onClick={() => {
                setEditSelect("text");
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </li>
            <li
              className={`todayView-editBox-leftBox-imageEdit ${editSelect}`}
              onClick={() => {
                setEditSelect("image");
              }}
            >
              <i className="fa-regular fa-image"></i>
            </li>
            <li
              className={`todayView-editBox-leftBox-colorEdit ${editSelect}`}
              onClick={() => {
                setEditSelect("color");
              }}
            >
              <div></div>
            </li>
            <li
              className={`todayView-editBox-leftBox-ratioEdit ${editSelect}`}
              onClick={() => {
                setEditSelect("ratio");
              }}
            >
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </li>
            <li
              className={`todayView-editBox-leftBox-brightEdit ${editSelect}`}
              onClick={() => {
                setEditSelect("bright");
              }}
            >
              <ion-icon name="sunny-outline"></ion-icon>
            </li>
            <li
              className={`todayView-editBox-leftBox-remove ${editSelect}`}
              onClick={() => {
                setEditSelect("remove");
              }}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </li>
          </ul>
          <ul className="todayView-editBox-rightBox">
            <li
              style={
                editSelect === "text"
                  ? { opacity: 1, pointerEvents: `all` }
                  : { opacity: 0, pointerEvents: "none" }
              }
              className="todayView-editBox-rightBox-textSelect"
            ></li>
            <li
              style={
                editSelect === "image"
                  ? { opacity: 1, pointerEvents: `all` }
                  : { opacity: 0, pointerEvents: "none" }
              }
              className="todayView-editBox-rightBox-imageSelect"
            >
              <label htmlFor="file">
                <div className="todayView-editBox-rightBox-imageSelect-upload">
                  upload
                </div>
              </label>
              <input
                accept="image/*"
                multiple
                type="file"
                id="file"
                onChange={(e) => onUpload(e)}
              ></input>
            </li>
            <li
              style={
                editSelect === "color"
                  ? { opacity: 1, pointerEvents: `all` }
                  : { opacity: 0, pointerEvents: "none" }
              }
              className="todayView-editBox-rightBox-colorSelect"
            >
              <button
                style={color === "#ffffff" ? { opacity: 1 } : { opacity: 0.5 }}
                onClick={() => setColor("#ffffff")}
              ></button>
              <button
                style={color === "#000000" ? { opacity: 1 } : { opacity: 0.5 }}
                onClick={() => setColor("#000000")}
              ></button>
              <button
                style={color === "#FFC800" ? { opacity: 1 } : { opacity: 0.5 }}
                onClick={() => setColor("#FFC800")}
              ></button>
            </li>
            <li
              style={
                editSelect === "ratio"
                  ? { opacity: 1, pointerEvents: `all` }
                  : { opacity: 0, pointerEvents: "none" }
              }
              className="todayView-editBox-rightBox-ratioSelect"
            >
              <button
                style={ratio === "center" ? { opacity: 1 } : { opacity: 0.5 }}
                onClick={() => setRatio("center")}
              ></button>
              <button
                style={ratio === "row" ? { opacity: 1 } : { opacity: 0.5 }}
                onClick={() => setRatio("row")}
              ></button>
              <button
                style={ratio === "column" ? { opacity: 1 } : { opacity: 0.5 }}
                onClick={() => setRatio("column")}
              ></button>
            </li>
            <li
              style={
                editSelect === "bright"
                  ? { opacity: 1, pointerEvents: `all` }
                  : { opacity: 0, pointerEvents: "none" }
              }
              className="todayView-editBox-rightBox-brightSelect"
            >
              <div
                className="todayView-editBox-rightBox-brightSelect-box"
                onMouseMove={(e) => brightHandle(e)}
                onMouseDown={(e) => {
                  setBrightActive(true);
                }}
                onMouseUp={() => {
                  setBrightActive(false);
                }}
                onMouseLeave={() => {
                  setBrightActive(false);
                }}
              >
                <div
                  className="todayView-editBox-rightBox-brightSelect-ball"
                  style={
                    brightActive
                      ? { top: `${bright}%`, opacity: 1 }
                      : { top: `${bright}%`, opacity: 0.5 }
                  }
                ></div>
                <div
                  className="todayView-editBox-rightBox-brightSelect-line"
                  ref={brightRef}
                ></div>
              </div>

              <div className="todayView-editBox-rightBox-brightSelect-percent">
                {Math.floor(bright)}
              </div>
            </li>
            <li
              className="todayView-editBox-rightBox-removeSelect"
              style={
                editSelect === "remove"
                  ? { opacity: 1, pointerEvents: `all` }
                  : { opacity: 0, pointerEvents: "none" }
              }
            >
              <div onClick={removeHandle}> remove</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodayView;
