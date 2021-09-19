import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
      <li>
        <Link to="/" style={{ marginRight: 10 }} className="icon nwitter">
          <div className="tooltip">Home</div>
          {/* <i class="faTwitter fa-3x"></i> */}
          <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="2x"
            className="nwitterIcon"
          />
        </Link>
      </li>
      <li>
        <Link to="/profile" className="icon profile">
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span className="tooltip">
            {userObj.displayName ? `${userObj.displayName}` : "Profile"}
            {/* 이름이 존재할경우에 앞에 글자추가 */}
          </span>
        </Link>{" "}
      </li>
    </ul>
  </nav>
);

export default Navigation;
