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

// import firestore from "@react-native-firebase/firestore";
// import "../css/home.css";

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

  return (
    <div>
      <NweetFactory userObj={userObj}></NweetFactory>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          ></Nweet>
        ))}
      </div>
    </div>
  );
};
export default Home;
