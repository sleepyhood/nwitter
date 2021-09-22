import React, { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  onSnapshot,
  getFirestore,
  query,
} from "firebase/firestore";
import Nweet from "../components/Nweet";
import NweetFactory from "components/NweetFactory";
import LogoNav from "../components/LogoNav";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
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
    <div className="container">
      {
        // isMobile &&
        <>
          <LogoNav />
          <NweetFactory userObj={userObj} />
          <div className="nweets">
            {nweets.map((nweet) => (
              <>
                <Nweet
                  key={nweet.id}
                  nweetObj={nweet}
                  isOwner={nweet.creatorId === userObj.uid}
                  displayName={nweet.displayName}
                />
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
