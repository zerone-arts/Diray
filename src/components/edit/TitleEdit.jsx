import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/editCss/TitleEdit.css";

function TitleEdit({ titleEditActive, setTitleEditActive, setPresentTitle }) {
  const [text, SetText] = useState("");
  const [inputBoxWidth, setInputBoxWidth] = useState(30);
  const textSpanRef = useRef(null);

  const onText = (e) => {
    SetText(e.target.value);
  };

  const keyPressHandle = (e) => {
    titleSelectHandle();
  };

  const titleSelectHandle = () => {
    setTitleEditActive(false);
    setPresentTitle(text);
  };

  useEffect(() => {
    if (textSpanRef.current?.getBoundingClientRect().width > 30) {
      setInputBoxWidth(textSpanRef.current?.getBoundingClientRect().width);
    }
  }, [textSpanRef.current?.getBoundingClientRect().width, text]);

  return (
    <div
      className="title-edit-container"
      style={
        titleEditActive
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
      <span ref={textSpanRef} className="title-eidt-inputWidth">
        {text}
      </span>
      <button
        className="title-edit-select"
        onClick={titleSelectHandle}
      ></button>
    </div>
  );
}

export default TitleEdit;
