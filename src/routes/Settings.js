import React, { useEffect, useRef, useState } from "react";
import DarkModeToggle from "components/DarkModeToggle";

const Settings = () => {
  return (
    <div className="setContainer">
      <div className="settingTitle">Settings</div>
      <div>
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Settings;
