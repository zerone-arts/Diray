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
      hex: "#d19680",
      color: "209,150,128",
    },
    {
      num: 11,
      hex: "#3e7e90",
      color: "62,126,144",
    },

    {
      num: 12,
      hex: "#a76ac5",
      color: "167,106,197",
    },
    {
      num: 1,
      hex: "#ffffff",
      color: "255,255,255",
    },
    {
      num: 2,
      hex: "#ffc5b3",
      color: "255,197,179",
    },
    {
      num: 3,
      hex: "#faa1a8",
      color: "250,161,168",
    },
    {
      num: 4,
      hex: "#87b16e",
      color: "135,177,110",
    },
    {
      num: 5,
      hex: "#ffd33b",
      color: "255,211,59",
    },
    {
      num: 6,
      hex: "#54cec1",
      color: "84,206,193",
    },
    {
      num: 7,
      hex: "#24add3",
      color: "36,173,211",
    },
    {
      num: 8,
      hex: "#ce5458",
      color: "206,84,88",
    },
    {
      num: 9,
      hex: "#da7752",
      color: "218,119,82",
    },
    {
      num: 10,
      hex: "#d19680",
      color: "209,150,128",
    },
    {
      num: 11,
      hex: "#3e7e90",
      color: "62,126,144",
    },

    {
      num: 12,
      hex: "#a76ac5",
      color: "167,106,197",
    },
    {
      num: 1,
      hex: "#ffffff",
      color: "255,255,255",
    },
    {
      num: 2,
      hex: "#ffc5b3",
      color: "255,197,179",
    },
    {
      num: 3,
      hex: "#faa1a8",
      color: "250,161,168",
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
