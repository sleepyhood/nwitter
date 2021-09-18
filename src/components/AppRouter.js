import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import { Redirect } from "react-router";
import DarkModeToggle from "components/DarkModeToggle";
import SideBar from "components/SideBar";
import useDarkMode from "use-dark-mode";
import { BrowserRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isPc = useMediaQuery({
    query: "(min-width:1024px)",
  });

  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <>
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
              <Redirect from="*" to="/" />
            </>
          </div>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
            {/* 로그아웃시 profile에 머물지 않고 Home로 이동하게 */}
          </>
        )}
      </Switch>
      {/* <SideBar /> */}
      <DarkModeToggle />
    </Router>
  );
};
export default AppRouter;
