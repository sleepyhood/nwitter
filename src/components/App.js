import React, { useEffect, useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "myBase";
import { getAuth, updateProfile } from "@firebase/auth";
// import MediaQuery, { useMediaQuery } from "react-responsive";
import { BrowserRouter, HashRouter } from "react-router-dom";

function App() {
  // 2.4 로그인과 회원가입 여부 판별, 로그인시 footer가 home
  const [init, setInit] = useState(false);
  //  1.2 로그인이 되있으면 home, 안되있으면 Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // const isPC = useMediaQuery({
  //   query: "(min-width: 1024px)",
  // });

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        // setIsLoggedIn(true);
        //5.2 user는 필요이상의 정보를 가진 object이기 떄문에, 필요한 정보만 이동

        setUserObj(user);
        console.log(userObj);
        if (user.displayName === null) {
          const randNum = Math.floor(Math.random() * (456 - 1)) + 1;
          // await updateProfile(userObj, { displayName: "Nwitter" });
          // setUserObj({ displayName: "Nwitter" });
          if (randNum < 10) {
            user.displayName = `No. 00${randNum}`;
          } else if (randNum >= 10 && randNum < 100) {
            user.displayName = `No. 0${randNum}`;
          } else {
            user.displayName = `No. ${randNum}`;
          }
          // 09.26 새로고침 되도 이름이 바뀌지 않게
          const auth = getAuth();
          updateProfile(auth.currentUser, {
            displayName: user.displayName,
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        }
      } else {
        // 6.0 로그아웃이 정상적으로 작동하기위해 조건문
        setUserObj(null);
      }
      // console.log(user);
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    // setUserObj({
    //   displayName: user.displayName,
    //   uid: user.uid,
    //   updateProfile: (args) => user.updateProfile(args),
    // });

    // setUserObj({ displayName: "BS" });
    setUserObj({ ...user });
    setUserObj(user);

    // 09.15 현재 로그인된 유저의 이름
    // console.log(authService.currentUser.displayName);
  };

  // THis Error called "Code is deployed, but page is blank"

  return (
    <>
      {init ? (
        <>
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
          ></AppRouter>
        </>
      ) : (
        <>
          <div className="refreshContainer">
            <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Initializing...</span>
          </div>
        </>
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}
export default App;
