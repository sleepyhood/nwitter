import React from "react";
import useDarkMode from "use-dark-mode";

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
          className="darkToggleBtn"
        >
          {darkMode.value ? (
            <i className="far fa-lightbulb fa-2x" id="lightbulb"></i>
          ) : (
            <i className="far fa-lightbulb fa-2x" id="darkbulb"></i>
          )}
        </button>
      </div>
    </label>
  );
};

export default DarkModeToggle;
