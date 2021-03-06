import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  const [isHome, setIsHome] = useState(true);
  const [isProfile, setIsProfile] = useState(false);
  const [isAlarms, setIsAlarms] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  const onHome = (e) => {
    if (!isHome) {
      setIsHome(true);
      setIsProfile(false);
      setIsAlarms(false);
      setIsSettings(false);
    }
  };

  const onProfile = (e) => {
    if (!isProfile) {
      setIsHome(false);
      setIsProfile(true);
      setIsAlarms(false);
      setIsSettings(false);
    }
  };

  const onAlarms = () => {
    if (!isAlarms) {
      setIsHome(false);
      setIsProfile(false);
      setIsAlarms(true);
      setIsSettings(false);
    }
  };

  const onSettings = () => {
    if (!isSettings) {
      setIsHome(false);
      setIsProfile(false);
      setIsAlarms(false);
      setIsSettings(true);
    }
  };

  return (
    <nav>
      <ul className="navigationBar">
        <li>
          <Link
            to="/"
            style={{ marginRight: 10 }}
            className="icon nwitter"
            onClick={onHome}
          >
            <div className="tooltip"></div>
            {/* <i className="faTwitter fa-3x"></i> */}
            {isHome ? (
              <i className="fas fa-home fa-2x"></i>
            ) : (
              <i className="fas fa-home fa-2x"></i>
            )}{" "}
            {/* <FontAwesomeIcon
              icon={faTwitter}
              color={"#04AAFF"}
              size="2x"
              className="nwitterIcon"
            /> */}
          </Link>
        </li>
        <li>
          <Link to="/profile" className="icon profile" onClick={onProfile}>
            {isProfile ? (
              <i className="fas fa-user fa-2x"></i>
            ) : (
              <i className="far fa-user fa-2x"></i>
            )}

            {/* {<span className="tooltip">
            {userObj.displayName ? `${userObj.displayName}` : "Profile"}
          </span>} */}
          </Link>
        </li>
        <li>
          <Link to="/alarms" className="icon profile" onClick={onAlarms}>
            <span className="tooltip">
              {isAlarms ? (
                <i className="fas fa-bell fa-2x"></i>
              ) : (
                <i className="far fa-bell fa-2x"></i>
              )}
            </span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="icon profile" onClick={onSettings}>
            <span className="tooltip">
              {isSettings ? (
                <i className="fas fa-cog fa-2x"></i>
              ) : (
                <i className="fas fa-cog fa-2x"></i>
              )}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
