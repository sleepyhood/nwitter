import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Alarms from "../routes/Alarms";
import Navigation from "./Navigation";
import { Redirect } from "react-router";
import Settings from "../routes/Settings";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        <>
          {isLoggedIn ? (
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                // marginTop: 50,
                display: "flex",
                // justifyContent: "center",
              }}
            >
              <>
                <Route exact path="/nwitter">
                  <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                  <Profile userObj={userObj} refreshUser={refreshUser} />
                </Route>
                <Route exact path="/alarms">
                  <Alarms />
                </Route>
                <Route exact path="/settings">
                  <Settings />
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
        </>
      </Switch>
      {isLoggedIn && <Navigation userObj={userObj} />}
    </Router>
  );
};
export default AppRouter;
