import React from "react";
import useDarkMode from "use-dark-mode";

// import Toggle from "./Toggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DarkModeToggle = () => {
  const darkMode = useDarkMode(false);

  return (
    <label className="toggle-wrapper" htmlFor="toggle">
      <div>
        {/* <button type="button" onClick={darkMode.disable}>
          ☀
        </button> */}
        {/* <Toggle checked={darkMode.value} onChange={darkMode.toggle} /> */}
        {/* <button type="button" onClick={darkMode.enable}>
          ☾
        </button> */}
        <button
          checked={darkMode.value}
          type="button"
          onClick={darkMode.toggle}
          class="darkToggleBtn"
        >
          {darkMode.value ? (
            <i class="far fa-lightbulb fa-3x" id="lightbulb"></i>
          ) : (
            <i class="far fa-lightbulb fa-3x" id="darkbulb"></i>
          )}
        </button>
      </div>
    </label>
  );
};

export default DarkModeToggle;
