import React, { useRef, useState } from "react";
import { dbService, storageService, authService } from "myBase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import {
  uploadString,
  getDownloadURL,
  deleteObject,
  ref,
} from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import {
  getDatabase,
  set,
  runTransaction,
  ref as realRef,
} from "firebase/database";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    if (nweet === "") {
      return;
    }
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      //파일 경로 참조 만들기
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const uploadFile = await uploadString(fileRef, attachment, "data_url");
      console.log(uploadFile);
      //storage에 있는 파일 URL로 다운로드 받기
      attachmentUrl = await getDownloadURL(uploadFile.ref);
    }
    let d = new Date();

    const nweetObj = {
      text: nweet,
      createdAt: d.toLocaleString("ko-KR"),
      creatorId: userObj.uid,
      // 09.15 파이어베이스로부터 해당 트윗의 작성자를 불러옴!
      displayName: authService.currentUser.displayName,
      // 09.18 프로필 사진은 photoURL!!!!!!!!!!
      displayProfile: authService.currentUser.photoURL,
      attachmentUrl,
      likeCnt: 0,
      likeUids: [],
    };

    console.log(`current user: ${authService.currentUser}`);
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), nweetObj);
      console.log("Document written with ID: ", docRef.id);

      const db = getDatabase();
      // console.log(db);
      const re = set(realRef(db, "nweets/" + docRef.id), {
        text: nweetObj.text,
        createdAt: nweetObj.createdAt,
        creatorId: nweetObj.creatorId,
        // 09.15 파이어베이스로부터 해당 트윗의 작성자를 불러옴!
        displayName: nweetObj.displayName,
        // 09.18 프로필 사진은 photoURL!!!!!!!!!!
        displayProfile: nweetObj.displayProfile,
        attachmentUrl: nweetObj.attachmentUrl,
        likeCnt: nweetObj.likeCnt,
        likeUids: nweetObj.likeUids,
      });
      console.log(re);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    // event내에 있는 target.value를 가져와라
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => {
    fileInput.current.value = "";
    setAttachment("");
  };
  const fileInput = useRef();

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <textarea
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What is next game?"
          maxLength={120}
        />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        {/* <span>Add photos</span> */}
        <i className="fas fa-camera fa-lg"></i>
        <input type="submit" value="➜" className="factoryInput__arrow">
          {/* <i className="fas fa-pencil-alt fa-lg"></i> */}
        </input>
      </label>
      {/* 4.0 파일 업로드 */}
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
          height: 0,
        }}
        ref={fileInput}
      />
      <input type="submit" value="Nweet!" style={{ opacity: 0 }} />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              // opacity: 0,
              backgroundImage: attachment,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <i className="fas fa-times fa-2x"></i>
          </div>
        </div>
      )}
    </form>
  );
};
export default NweetFactory;
