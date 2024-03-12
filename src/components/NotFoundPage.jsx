import React from "react";
import "../assets/css/NotFoundPage.css";
import notFoundImg from "../assets/img/notFoundImg.JPG";
function NotFoundPage(props) {
  return (
    <div className="notfoundpage-container">
      <div className="header-hide"></div>
      <div className="notfoundpage-container-box">
        <h2>.Page Not Found</h2>
        <div className="notfoundpage-container-box-wrapper">
          <img src={notFoundImg} alt="" />
          <div>
            <p>404</p>
            <p>you appear to be lost</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
