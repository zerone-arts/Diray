import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/editCss/OneWordEdit.css";
function OneWordEdit({
  oneWordEditActive,
  setOneWordEditActive,
  setPresentOneWord,
}) {
  const [text, SetText] = useState("");
  const [inputBoxWidth, setInputBoxWidth] = useState(30);
  const textSpanRef = useRef(null);

  const onText = (e) => {
    SetText(e.target.value);
  };

  const keyPressHandle = (e) => {
    oneWordSelectHandle();
  };

  const oneWordSelectHandle = () => {
    setOneWordEditActive(false);
    setPresentOneWord(text);
  };

  useEffect(() => {
    if (textSpanRef.current?.getBoundingClientRect().width > 30) {
      setInputBoxWidth(textSpanRef.current?.getBoundingClientRect().width);
    }
  }, [textSpanRef.current?.getBoundingClientRect().width, text]);

  return (
    <div
      className="oneword-edit-container"
      style={
        oneWordEditActive
          ? { opacity: 1, pointerEvents: "all" }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <span>"</span>
      <input
        type="text"
        onChange={onText}
        style={{ width: `${inputBoxWidth}px` }}
        onKeyDown={(e) => {
          if (e.code === "Enter") keyPressHandle();
        }}
      ></input>
      <span>"</span>
      <span ref={textSpanRef} className="oneword-eidt-inputWidth">
        {text}
      </span>

      <button
        className="oneword-edit-select"
        onClick={oneWordSelectHandle}
      ></button>
    </div>
  );
}

export default OneWordEdit;
