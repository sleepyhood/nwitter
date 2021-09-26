import React, { useState, useEffect } from "react";
import { dbService, storageService } from "myBase";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  uploadString,
  getDownloadURL,
  deleteObject,
  get,
  ref,
} from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
// import { authService } from "myBase";
// 09.17 modal update
import { ModalProvider } from "styled-react-modal";
import Modal from "styled-react-modal";
// import styled, { css } from "styled-components";
import { useMediaQuery } from "react-responsive";
import { collection, getDocs, query, where } from "@firebase/firestore";

import {
  getDatabase,
  set,
  ref as realRef,
  runTransaction,
} from "firebase/database";

const Nweet = ({ nweetObj, isOwner, currUserId }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const [isOpen, setIsOpen] = useState(false);
  const [like, setLike] = useState(0);
  const [existLike, setExistLike] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 700px)" });
  const isPc = useMediaQuery({
    query: "(min-width:700px)",
  });

  useEffect(() => {
    // console.log(`current User: ${currUserId}`);
    // console.log(`nweets/${nweetObj.likeUids}`);
  });

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (ok) {
      await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const toggleModal = (e) => {
    setIsOpen(!isOpen);
  };

  const onLike = async (event) => {
    event.preventDefault();
    // 09.25 트렌젝션 쓰고부터 광명 찾았다
    const getResult = toggleStar(currUserId);
    getResult.then(async (value) => {
      let obj = JSON.stringify(value.snapshot);

      let jsonObj = JSON.parse(obj);
      // console.log(jsonObj.likeCnt);
      // console.log(jsonObj.likeUids);
      // console.log(jsonObj.likeUids[currUserId]);
      await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
        likeCnt: jsonObj.likeCnt,
        likeUids: jsonObj.likeUids,
      });
    });
  };

  const toggleStar = (user) => {
    const db = getDatabase();
    const postRef = realRef(db, "nweets/" + nweetObj.id);

    const re = runTransaction(postRef, (post) => {
      if (post) {
        if (post.likeUids && post.likeUids[user]) {
          //
          post.likeCnt--;
          post.likeUids[user] = false;
        } else {
          // 아직 좋아요를 안 눌렀을때
          post.likeCnt++;

          if (!post.likeUids) {
            post.likeUids = {};
          }
          post.likeUids[user] = true;
        }
      }
      console.log(post);

      return post;
    });
    return re;
  };

  const StyledModal = Modal.styled`
  display: flex;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: ${(props) => props.opacity};
  background-color: rgba(0, 0, 0, 0.8);
  
`;
  return (
    <div>
      {
        <div className="nweet">
          {editing ? (
            <>
              {/* ! 트윗 내용 변경시 */}
              {isOwner && (
                <div className="editForm">
                  <form onSubmit={onSubmit} className="container nweetEdit">
                    <textarea
                      type="text"
                      placeholder="Edit your text"
                      value={newNweet}
                      required
                      autoFocus
                      onChange={onChange}
                      className="formInput"
                      maxLength={120}
                    />
                    <input type="submit" value="Update" className="formBtn" />
                  </form>
                  <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                  </span>{" "}
                </div>
              )}
            </>
          ) : (
            <>
              <span className="authorProfile">
                {/* 09.19유저의 프로필 */}
                {/* 09.26 있을때와 없을때 구분 */}
                {nweetObj.displayProfile ? (
                  <img src={nweetObj.displayProfile} className="authorPhoto" />
                ) : (
                  <i
                    className="far fa-user-circle fa-3x fa fa-quote-left fa-pull-left fa-border"
                    id="nullUser"
                  ></i>
                )}
                {/* ! 자신이 작성된 트윗을 보여줄 경우 */}
                <span className="author">{`${nweetObj.displayName}`}</span>
              </span>
              <div className="nweetText">{nweetObj.text}</div>
              {nweetObj.attachmentUrl && (
                <>
                  <img
                    src={nweetObj.attachmentUrl}
                    onClick={toggleModal}
                    className="nweetImg"
                  />

                  <ModalProvider>
                    <div className="newModal">
                      <StyledModal
                        isOpen={isOpen}
                        onBackgroundClick={toggleModal}
                        onEscapeKeydown={toggleModal}
                      >
                        <img
                          src={nweetObj.attachmentUrl}
                          className="modalImg"
                        ></img>
                        <button onClick={toggleModal} id="modalCloseBtn">
                          <i className="fas fa-times fa-2x" id="closeModal"></i>
                        </button>
                      </StyledModal>
                    </div>
                  </ModalProvider>
                </>
              )}

              {/* 09.24 좋아요 */}
              <div className="likeBtn" onClick={onLike}>
                {nweetObj.likeUids[currUserId] ? (
                  // 좋아요 누름!
                  <div className="star">
                    <i className="fas fa-star fa-lg"></i>
                    <span>{nweetObj.likeCnt}</span>
                  </div>
                ) : (
                  // 좋아요 안 누름!
                  <div className="notStar">
                    <i className="far fa-star fa-lg"></i>
                    <span>{nweetObj.likeCnt}</span>
                  </div>
                )}
              </div>
              <div className="nweetTime">{`${nweetObj.createdAt}`}</div>

              {isOwner && (
                <div className="nweet__actions">
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                </div>
              )}

              {/* <button onClick={onLike}>{likeCnt}</button> */}
            </>
          )}
        </div>
      }{" "}
    </div>
  );
};
export default Nweet;
