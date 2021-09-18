import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  orderBy,
  onSnapshot,
  getFirestore,
  query,
} from "firebase/firestore";
import Nweet from "../components/Nweet";
import NweetFactory from "components/NweetFactory";
import Profile from "./Profile";
import { ThemeProvider } from "styled-components";
import styled, { css } from "styled-components";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  //   const getNweets = async () => {
  //     const dbNweets = await getDocs(collection(dbService, "nweets"));
  //     dbNweets.forEach((document) => {
  //       console.log(document.data());
  //       const nweetObject = { ...document.data(), id: document.id };
  //       setNweets((prev) => [nweetObject, ...prev]);
  //       // 이전 데이터 호출
  //     });
  // console.log(dbNweets);
  //   };

  // 3.4 snpshot를 통해 query를 쓰는것보다 실시간으로 빠르게 정보가 전달됨
  useEffect(() => {
    const q = query(
      collection(getFirestore(), "nweets"),
      orderBy("createdAt", "desc")
    );
    const happend = onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(newArray);
      console.log(newArray);
    });
    return () => {
      happend();
    };
  }, []);

  //09.17 media query

  return (
    // 09.14 displayName은 트윗의 작성자를 나타냄
    <div className="contaer">
      {
        // isMobile &&
        <>
          <NweetFactory userObj={userObj}></NweetFactory>
          <div style={{ marginTop: 30 }}>
            {nweets.map((nweet) => (
              <>
                <Nweet
                  key={nweet.id}
                  nweetObj={nweet}
                  isOwner={nweet.creatorId === userObj.uid}
                  displayName={nweet.displayName}
                ></Nweet>
                {/* <Profile CID={nweet.creatorId} /> */}
              </>
            ))}
          </div>
        </>
      }
    </div>
  );
};
export default Home;
