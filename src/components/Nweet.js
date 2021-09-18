import React, { useState } from "react";
import { dbService, storageService } from "myBase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "@firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { authService } from "myBase";
// 09.17 modal update
import { ModalProvider } from "styled-react-modal";
import Modal from "styled-react-modal";
import styled, { css } from "styled-components";
import { useMediaQuery } from "react-responsive";

const Nweet = ({ nweetObj, isOwner, displayName }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const isPc = useMediaQuery({
    query: "(min-width:800px)",
  });

  const [likeCnt, setLikeCnt] = useState(0);

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

  const onLike = (event) => {
    setLikeCnt(likeCnt + 1);
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
      {isPc && (
        <div className="nweet_PC">
          {editing ? (
            <>
              {/* ! 트윗 내용 변경시 */}
              {isOwner && (
                <>
                  <form onSubmit={onSubmit} className="container nweetEdit">
                    <input
                      type="text"
                      placeholder="Edit your nweet"
                      value={newNweet}
                      required
                      autoFocus
                      onChange={onChange}
                      className="formInput"
                    />
                    <input
                      type="submit"
                      value="Update Nweet"
                      className="formBtn"
                    />
                  </form>
                  <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                  </span>{" "}
                </>
              )}
            </>
          ) : (
            <>
              {/* ! 자신이 작성된 트윗을 보여줄 경우 */}
              <span className="author">{`${nweetObj.displayName}`}</span>
              <h4 className="nweetText">{nweetObj.text}</h4>
              {nweetObj.attachmentUrl && (
                <>
                  <img
                    src={nweetObj.attachmentUrl}
                    onClick={toggleModal}
                    className="nweetImg"
                  ></img>

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
                          <i class="fas fa-times fa-2x" id="closeModal"></i>
                        </button>
                      </StyledModal>
                    </div>
                  </ModalProvider>
                </>
              )}
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
            </>
          )}
        </div>
      )}
      {isMobile && (
        <div className="nweet">
          {editing ? (
            <>
              {/* ! 트윗 내용 변경시 */}
              {isOwner && (
                <>
                  <form onSubmit={onSubmit} className="container nweetEdit">
                    <input
                      type="text"
                      placeholder="Edit your nweet"
                      value={newNweet}
                      required
                      autoFocus
                      onChange={onChange}
                      className="formInput"
                    />
                    <input
                      type="submit"
                      value="Update Nweet"
                      className="formBtn"
                    />
                  </form>
                  <span onClick={toggleEditing} className="formBtn cancelBtn">
                    Cancel
                  </span>{" "}
                </>
              )}
            </>
          ) : (
            <>
              {/* ! 자신이 작성된 트윗을 보여줄 경우 */}
              <span className="author">{`${nweetObj.displayName}`}</span>
              <h4 className="nweetText">{nweetObj.text}</h4>
              {nweetObj.attachmentUrl && (
                <>
                  <img
                    src={nweetObj.attachmentUrl}
                    onClick={toggleModal}
                    className="nweetImg"
                  ></img>

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
                          <i class="fas fa-times fa-2x" id="closeModal"></i>
                        </button>
                      </StyledModal>
                    </div>
                  </ModalProvider>
                </>
              )}
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
              <button onClick={onLike}>{likeCnt}</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default Nweet;
