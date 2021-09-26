import { authService, dbService, storageService } from "myBase";
import React, { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Profile = ({ userObj, refreshUser }) => {
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
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
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
    console.log(userObj.displayName);
    console.log(newDisplayName);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // 5.1 기존 이름과 새로 바꾼이름이 다를 떄만 업데이트
    // 프로필 이미지도 바꿀수 있음! 나중에 시도각
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);

    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });

      // 09.21 드디어 이름변경시 이전 트윗들도 표시기능 탑재

      querySnapshot.forEach((document) => {
        updateDoc(doc(dbService, `nweets/${document.id}`), {
          displayName: newDisplayName,
        });
      });
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

      await updateProfile(userObj, { photoURL: attachmentUrl });

      querySnapshot.forEach((document) => {
        updateDoc(doc(dbService, `nweets/${document.id}`), {
          displayProfile: attachmentUrl,
        });
      });
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
    <div className="container profile">
      <div className="title profile">Profile</div>
      {/* css 에서 stretch를 쓰면 됨. form쓰면 업뎃 안됨 */}
      <div className="list profile">
        <form onSubmit={onSubmit} className="profileForm">
          {/* 09.18 사용자의 프로필 사진 */}
          {/* 09.18 사용자에게 기본 프로필이 있을경우 : 없을경우 */}
          {/* 09.20 드디어 수정! 사진이 기존 위치에 고정 가능 */}
          {authService.currentUser.photoURL ? (
            // 사용자 프로필이 이미 있으면 && 새로 바꾸면
            newDisplayProfile ? (
              <label
                htmlFor="attach-file"
                className="factoryInput__label profile"
              >
                <img src={newDisplayProfile} className="newPhotoTrue" />
              </label>
            ) : (
              // 프로필이 안 바뀐 경우
              <label
                htmlFor="attach-file"
                className="factoryInput__label profile"
              >
                <img
                  src={authService.currentUser.photoURL}
                  className="currentPhotoTrue"
                  alt="currentPhotoTrue"
                />
              </label>
            )
          ) : newDisplayProfile ? (
            <label for="attach-file" className="factoryInput__label profile">
              <div className="currentPhotoFalse">
                <img
                  src={newDisplayProfile}
                  className="newPhotoTrue"
                  alt="newPhotoTrue"
                />{" "}
              </div>
            </label>
          ) : (
            // 프로필 업뎃도 안하고 아예 빈공간일때
            <label
              htmlFor="attach-file"
              className="factoryInput__label profile"
            >
              <i
                className="far fa-user-circle fa-4x fa fa-quote-left fa-pull-left fa-border"
                id="nullUser"
              ></i>
              {/* <img src={newDisplayProfile} className="newPhotoTrue" /> */}
            </label>
          )}

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
            name="newDisplayProfile"
          />

          {/* https://basketdeveloper.tistory.com/70  참고*/}
          <input
            onChange={onChange}
            type="text"
            autoFocus
            placeholder="Display Name"
            value={newDisplayName}
            className="formInput profile"
            maxLength={30}
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn profile"
            style={{
              marginTop: 10,
            }}
          />
        </form>
        <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
          Log Out
        </span>
      </div>
    </div>
  );
};
export default Profile;
