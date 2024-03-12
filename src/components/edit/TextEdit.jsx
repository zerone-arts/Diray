import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/editCss/TextEdit.css";

function TextEdit({ textEditActive, setTextEditActive, setPresentText }) {
  const [text, SetText] = useState("");
  const [inputBoxWidth, setInputBoxWidth] = useState(30);
  const textSpanRef = useRef(null);

  const onText = (e) => {
    SetText(e.target.value);
  };

  const keyPressHandle = (e) => {
    textSelectHandle();
  };

  const textSelectHandle = () => {
    setTextEditActive(false);
    setPresentText(text);
  };

  useEffect(() => {
    if (textSpanRef.current?.getBoundingClientRect().width > 30) {
      setInputBoxWidth(textSpanRef.current?.getBoundingClientRect().width);
    }
  }, [textSpanRef.current?.getBoundingClientRect().width, text]);

  return (
    <div
      className="text-edit-container"
      style={
        textEditActive
          ? { opacity: 1, pointerEvents: "all" }
          : { opacity: 0, pointerEvents: "none" }
      }
    >
      <input
        type="text"
        onChange={onText}
        style={{ width: `${inputBoxWidth}px` }}
        onKeyDown={(e) => {
          if (e.code === "Enter") keyPressHandle();
        }}
      ></input>
      <span ref={textSpanRef} className="text-eidt-inputWidth">
        {text}
      </span>
      <button className="text-edit-select" onClick={textSelectHandle}></button>
    </div>
  );
}

export default TextEdit;
