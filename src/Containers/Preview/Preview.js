import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";

import { db, storage } from "../../firebase/firebase";
import { resetCameraImage, selectCameraImage } from "../../redux/cameraSlice";
import { selectUser } from "../../redux/appSlice";
import "./Preview.css";

function Preview() {
     const cameraImage = useSelector(selectCameraImage);
     const user = useSelector(selectUser);
     const dispatch = useDispatch();
     const history = useHistory();

     // redirecting to webcam page if image not exist
     useEffect(() => {
          if (!cameraImage) {
               history.replace("/webcam");
          }
     }, [cameraImage, history]);

     const closePreview = () => {
          dispatch(resetCameraImage());
     };

     const sendPost = () => {
          const id = uuidv4();
          const uploadPost = storage
               .ref(`posts/${id}`)
               .putString(cameraImage, "data_url");

          uploadPost.on(
               "state_changed",
               null,
               (err) => console.log(err),
               () => {
                    storage
                         .ref("posts")
                         .child(id)
                         .getDownloadURL()
                         .then((url) => {
                              db.collection("posts").add({
                                   imageUrl: url,
                                   username: "Rajesh",
                                   profilePic: user.profilePic,
                                   timestamp:
                                        firebase.firestore.FieldValue.serverTimestamp(),
                              });
                              dispatch(resetCameraImage());
                              console.log("");
                              history.replace("/");
                         });
               }
          );
     };

     return (
          <div className="preview">
               <i className="closeIcon bx bx-x" onClick={closePreview}></i>
               <div className="preview_toolbar">
                    <i className="textIcon bx bx-text"></i>
                    <i className="pencilIcon bx bx-pencil"></i>
                    <i className="noteIcon bx bx-note"></i>
                    <i className="musicIcon bx bx-music"></i>
                    <i className="cropIcon bx bx-crop"></i>
                    <i className="timerIcon bx bx-timer"></i>
               </div>
               <img src={cameraImage} alt="user" />
               <div className="preview_footer" onClick={sendPost}>
                    <h3>Send now</h3>
                    <i className="sendIcon bx bx-send"></i>
               </div>
          </div>
     );
}

export default Preview;
