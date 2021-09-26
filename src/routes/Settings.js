import React from "react";
import DarkModeToggle from "components/DarkModeToggle";
import useDarkMode from "use-dark-mode";

const Settings = () => {
  const darkMode = useDarkMode(false);
  darkMode.value = false;
  return (
    <div className="container set">
      <div className="title set">Settings</div>
      <form className="list set">
        <div className="setItem">
          <span>Set DarkMode</span>
          <DarkModeToggle />
        </div>
      </form>
    </div>
  );
};

export default Settings;
