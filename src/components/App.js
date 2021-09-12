import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "myBase";
import { updateProfile } from "@firebase/auth";

function App() {
  // 2.4 로그인과 회원가입 여부 판별, 로그인시 footer가 home
  const [init, setInit] = useState(false);
  //  1.2 로그인이 되있으면 home, 안되있으면 Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        //5.2 user는 필요이상의 정보를 가진 object이기 떄문에, 필요한 정보만 이동
        setUserObj(user);
      } else {
        // 6.0 로그아웃이 정상적으로 작동하기위해 조건문
        setUserObj(null);
      }

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
    setUserObj({ ...user });
    setUserObj(user);
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}
export default App;
