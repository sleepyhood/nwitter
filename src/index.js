import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import firebase from "myBase";

import "../src/css/index.css";
import "../src/css/index_PC.css";
import "../src/css/navigation.css";
import "../src/css/nweet.css";
import "../src/css/setting.css";
import "../src/css/profile.css";
import "../src/css/alarms.css";
import "../src/css/auth.css";

import { HashRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
    <App />
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// https://www.npmjs.com/package/react-modal
// use now!!!!!!!
