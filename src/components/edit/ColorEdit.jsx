import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/editCss/ColorEdit.css";
function ColorEdit({
  monthList,
  colorEditActive,
  setColorEditActive,
  setPresentColor,
}) {
  const [colorCount, setColorCount] = useState(0);
  const [mouseActive, setMouseActive] = useState(false);
  const [mouseX, setMouseX] = useState(null);
  const [transition, setTransition] = useState("1s");

  let colorBox = [
    {
      num: 10,
      hex: "#818181",
      color: "129,129,129",
    },
    {
      num: 11,
      hex: "#faa1a8",
      color: "250,161,168",
    },
    {
      num: 12,
      hex: "#198077",
      color: "25,128,119",
    },
    {
      num: 1,
      hex: "#ffffff",
      color: "255,255,255",
    },
    {
      num: 2,
      hex: "#3a505e",
      color: "58,80,94",
    },
    {
      num: 3,
      hex: "#534776",
      color: "83,71,118",
    },
    {
      num: 4,
      hex: "#818181",
      color: "129,129,129",
    },
    {
      num: 5,
      hex: "#faa1a8",
      color: "250,161,168",
    },
    {
      num: 6,
      hex: "#198077",
      color: "25,128,119",
    },
    {
      num: 7,
      hex: "#ffffff",
      color: "255,255,255",
    },
    {
      num: 8,
      hex: "#3a505e",
      color: "58,80,94",
    },
    {
      num: 9,
      hex: "#534776",
      color: "83,71,118",
    },
    {
      num: 10,
      hex: "#818181",
      color: "129,129,129",
    },
    {
      num: 11,
      hex: "#faa1a8",
      color: "250,161,168",
    },
    {
      num: 12,
      hex: "#198077",
      color: "25,128,119",
    },
    {
      num: 1,
      hex: "#ffffff",
      color: "255,255,255",
    },
    {
      num: 2,
      hex: "#3a505e",
      color: "58,80,94",
    },
    {
      num: 3,
      hex: "#534776",
      color: "83,71,118",
    },
  ];

  const colorselectHandle = () => {
    setColorEditActive(false);
    setPresentColor(
      colorBox.find((color) => color.num === colorCount + 1).color
    );
  };
  const mouseMoveHandle = (e) => {
    if (mouseActive) {
      if (e.pageX > mouseX) {
        setColorCount((prev) => prev - 1);
        setMouseActive(false);
      } else if (e.pageX < mouseX) {
        setColorCount((prev) => prev + 1);
        setMouseActive(false);
      }
    }
  };

  const mouseDownHandle = (e) => {
    setMouseActive(true);
    setMouseX(e.pageX);
  };
  const mouseUpHandle = () => {
    setMouseActive(false);
  };

  useEffect(() => {
    if (colorCount === -1) {
      setTimeout(() => {
        setTransition("0s");
        setColorCount(11);
      }, 1000);
      setTimeout(() => {
        setTransition("1s");
      }, 1100);
    } else if (colorCount === 12) {
      setTimeout(() => {
        setTransition("0s");
        setColorCount(0);
      }, 1000);
      setTimeout(() => {
        setTransition("1s");
      }, 1100);
    }
  }, [colorCount]);

  return (
    <div
      className="color-edit-container"
      style={
        colorEditActive
          ? { opacity: 1, pointerEvents: "all" }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <div
        className="color-edit-Wrapper"
        onMouseDown={(e) => mouseDownHandle(e)}
        onMouseUp={mouseUpHandle}
        onMouseMove={(e) => mouseMoveHandle(e)}
      >
        <ul
          style={{
            transform: `translateX(${-colorCount * 70}px)`,
            transition: transition,
          }}
        >
          {colorBox.map((item, idx) => {
            return (
              <li key={idx} style={{ backgroundColor: item.hex }}>
                <p> {item.hex}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="color-edit-choose"></div>
      <button
        className="color-edit-select"
        onClick={colorselectHandle}
      ></button>
    </div>
  );
}

export default ColorEdit;
