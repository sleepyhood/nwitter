import { authService, dbService, storageService } from "myBase";
import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default ({ userObj, refreshUser }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState("");
  const [newDisplayProfile, setNewDisplayProfile] = useState("");

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
    // console.log(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // 5.1 기존 이름과 새로 바꾼이름이 다를 떄만 업데이트
    // 프로필 이미지도 바꿀수 있음! 나중에 시도각
    if (
      userObj.displayName !== newDisplayName ||
      userObj.displayName === null
    ) {
      await updateProfile(userObj, { displayName: newDisplayName });
      // await updateProfile(userObj, { photoURL: newDisplayProfile });
      // await updateProfile(userObj, { attachment: setAttachment });
      // console.log(`is user.displayName: ${userObj.displayName}`);
    }

    let attachmentUrl = "";
    if (newDisplayProfile !== "") {
      //파일 경로 참조 만들기
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      //storage 참조 경로로 파일 업로드 하기
      const uploadFile = await uploadString(
        fileRef,
        newDisplayProfile,
        "data_url"
      );
      //storage에 있는 파일 URL로 다운로드 받기
      attachmentUrl = await getDownloadURL(uploadFile.ref);
      // console.log(attachmentUrl);

      await updateProfile(userObj, { photoURL: attachmentUrl });

      // console.log(`is user.displayProfile: ${userObj.displayProfile}`);
    }
    // 미리보기는 해제
    fileInput.current.value = "";
    setNewDisplayProfile("");
    refreshUser();
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
      setNewDisplayProfile(result);
      setAttachment(result);
    };
    // console.log(theFile);
    reader.readAsDataURL(theFile);

    // 09.18 사용자 프로필
    // setNewDisplayProfile()
  };
  const onClearAttachment = () => {
    fileInput.current.value = "";
    setAttachment("");
    setNewDisplayProfile("");
  };
  const fileInput = useRef();

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        {/* 09.18 사용자의 프로필 사진 */}
        {/* 09.18 사용자에게 기본 프로필이 있을경우 : 없을경우 */}
        {authService.currentUser.photoURL ? (
          <img
            src={authService.currentUser.photoURL}
            className="currentPhotoTrue"
            // for="attach-file"
            // onClick={}
          />
        ) : (
          <div
            className="currentPhotoFalse"
            // for="attach-file"
          >
            <i className="far fa-user fa-4x"></i>
          </div>
        )}
        <label for="attach-file" className="factoryInput__label">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
          ref={fileInput}
          name="newDisplayProfile"
        />
        {newDisplayProfile && (
          <>
            <img src={newDisplayProfile} className="newPhotoTrue" />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </>
        )}

        {/* https://basketdeveloper.tistory.com/70  참고*/}
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display Name"
          value={newDisplayName}
          className="formInput"
          maxLength={30}
        />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
