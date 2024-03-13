import React, { useEffect, useRef, useState } from "react";
import "../assets/css/Month.css";
import { Link, useLocation } from "react-router-dom";
import TodayView from "./TodayView";
import { weekNumberByMonth } from "./util";
import axios from "axios";
function Month({ count, theme, userData }) {
  let date = new Date();
  const leftBoxRef = useRef(null);
  const bottomBoxRef = useRef(null);
  const dayRef = useRef(null);
  let monthBox = new Array(42).fill("");
  let monthNumList = new Array(12).fill("");
  const [slideBoxTransition, setSlideBoxTransition] = useState("1s");
  const [mouseActive, setMouseACtive] = useState(false);
  const [mouseY, setMouseY] = useState(null);
  const [mouseEvent, setMouseEvent] = useState("all");
  const [month, setMonth] = useState(count);
  const [presentMonth, setPresentMonth] = useState(date.getMonth() + 1);
  const [year, setYear] = useState(date.getFullYear());
  const [day, setDay] = useState(date.getDate());
  const [days, setDays] = useState(new Date(year, month, 0).getDate());
  const [dayList, setDayList] = useState([new Array(days).fill("")]);
  const [height, setHeight] = useState(180);
  const [selectDay, setSelectDay] = useState(null);
  const [selectMonth, setSelectMonth] = useState("");
  const [leftBall, setLeftBall] = useState(0);
  const [bottomBall, setBottomBall] = useState(0);
  const [todayActive, setTodayActive] = useState("");
  const [monthList, setMonthList] = useState([]);
  const [getWeek, setGetWeek] = useState(null);
  const [mark, setMark] = useState("");
  const [daySelectList, setDaySelectList] = useState([]);
  const [newDay, setNewDay] = useState(false);
  const [abbr, setAbbr] = useState(null);

  let list = [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
  let getMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let day1 = new Date(year, month - 1, 1).getDay();

  const monthHandle = () => {
    let day1 = new Date(year, month - 1, 1).getDay();
    let list = monthBox;
    list.map((item, idx) => {
      list[idx] = idx - (day1 - 1);

      if (list[idx] < 1 || list[idx] > days) {
        list[idx] = "";
      }
    });

    setMonthList(list);
  };

  const selectMonthHandle = (idx) => {
    setSelectMonth("");
    setMonth(idx + 1);
  };

  const getData = () => {
    setMark(
      userData?.monthDayData[getMonth[month - 1]].map((item, idx) => {
        return item.day;
      })
    );
  };

  const dayHandle = (idx, e) => {
    setSelectDay(idx);
    setLeftBall(
      e.target.getBoundingClientRect().top -
        leftBoxRef.current?.getBoundingClientRect().top
    );
    setBottomBall(
      e.target.getBoundingClientRect().left -
        bottomBoxRef.current?.getBoundingClientRect().left
    );
    setTodayActive("active");

    setSelectDay(idx + 1 - day1);
  };
  const mouseDownHandle = (e) => {
    setMouseACtive(true);
    setMouseY(e.pageY);
  };
  const mouseMoveHandle = (e) => {
    if (mouseActive) {
      if (e.pageY > mouseY) {
        setMonth((prev) => prev - 1);
        setMouseACtive(false);
      } else if (e.pageY < mouseY) {
        setMonth((prev) => prev + 1);
        setMouseACtive(false);
      }
    }
  };

  const mouseUpHandle = (e) => {
    setMouseACtive(false);
  };

  useEffect(() => {
    monthHandle();

    if (month == 0) {
      setMouseEvent("none");
      setTimeout(() => {
        setSlideBoxTransition("0s");
        setMonth(12);
      }, 1000);
      setTimeout(() => {
        setMouseEvent("all");
        setSlideBoxTransition("1s");
      }, 1100);
    }

    if (month == 13) {
      setMouseEvent("none");
      setTimeout(() => {
        setSlideBoxTransition("0s");
        setMonth(1);
      }, 1000);
      setTimeout(() => {
        setMouseEvent("all");
        setSlideBoxTransition("1s");
      }, 1100);
    }

    setDays(new Date(year, month, 0).getDate());
    getData();
    setAbbr(getMonth[month - 1]);
  }, [month]);

  useEffect(() => {
    getData();
  }, [newDay]);

  useEffect(() => {
    monthHandle();
    getData();
  }, []);

  return (
    <div className={`month-container ${theme}`}>
      <div className="month-topbar">
        <Link className={`month-topbar-link ${theme}`} to="/">
          one word .
        </Link>
        <div className={`month-topbar-monthNumBox ${theme}`}>
          <h2
            className={`month-topbar-monthNumBox-num ${selectMonth}`}
            onClick={() => setSelectMonth("active")}
          >
            {month}
          </h2>
          <ul
            className={`month-topbar-monthNumBox-numList ${selectMonth} ${theme}`}
          >
            {monthNumList.map((item, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => selectMonthHandle(idx)}
                  style={
                    theme === ""
                      ? month === idx + 1
                        ? { color: `rgba(0,0,0,1)` }
                        : { color: `rgba(0,0,0,0.3)` }
                      : month === idx + 1
                      ? { color: `rgba(255,255,255,1)` }
                      : { color: `rgba(255,255,255,0.3)` }
                  }
                >
                  {idx + 1}
                </li>
              );
            })}
          </ul>
        </div>
        <p className={`month-topbar-text ${theme}`}>
          Lorem ipsum dolor, sit amet consectetur.
        </p>
      </div>

      <ul className={`month-week ${theme}`}>
        <li>Sun</li>
        <li>Mon</li>
        <li>Toe</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <div className="month-box" style={{ height: `${height}px` }}>
        <ul
          className="month-list-wrapper"
          style={{
            top: `${-height}px`,
            height: `${height * 16}px`,
            transform: `translateY(${height * -month}px)`,
            transition: slideBoxTransition,
          }}
        >
          {list.map((item, idx) => {
            return (
              <li
                key={idx}
                className="month-list-box"
                onMouseDown={(e) => mouseDownHandle(e)}
                onMouseUp={(e) => mouseUpHandle(e)}
                onMouseMove={(e) => mouseMoveHandle(e)}
                style={{ height: `${height}px`, pointerEvents: mouseEvent }}
              >
                <ul className={`month-list-box-days ${theme}`}>
                  {monthList.map((item, idx) => {
                    return (
                      <li
                        className={
                          selectDay === idx + 1 - day1
                            ? `month-list-box-days-day active`
                            : `month-list-box-days-day`
                        }
                        key={idx}
                        onClick={(e) => dayHandle(idx, e)}
                        style={
                          month === presentMonth
                            ? item === day
                              ? { border: `1px solid rgb(125, 129, 165)` }
                              : { border: `none` }
                            : { border: `none` }
                        }
                      >
                        <p className="month-list-box-days-num"> {item}</p>
                        {userData?.monthDayData[getMonth[month - 1]].map(
                          (dayitem, idx) => {
                            return item === dayitem.day ? (
                              <div
                                key={idx}
                                className="month-list-box-days-mark"
                              ></div>
                            ) : (
                              ""
                            );
                          }
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="month-leftBox"
        ref={leftBoxRef}
        style={{ height: `${height}px` }}
      >
        <div className={`month-leftBox-line ${theme}`}></div>
        <div
          className={`month-leftBox-ball ${theme}`}
          style={{ top: `${leftBall + 15 - 4}px` }}
        ></div>
      </div>
      <div
        className="month-bottomBox"
        ref={bottomBoxRef}
        style={{
          transform: `translate(-50%, calc(-50% + ${height / 2 + 10}px))`,
        }}
      >
        <div className={`month-bottomBox-line ${theme}`}></div>
        <div
          className={`month-bottomBox-ball ${theme}`}
          style={{ left: `${bottomBall + 15 - 4}px` }}
        ></div>
      </div>
      <TodayView
        todayActive={todayActive}
        setTodayActive={setTodayActive}
        selectDay={selectDay}
        abbr={abbr}
        setNewDay={setNewDay}
        userData={userData}
      />
    </div>
  );
}

export default Month;
