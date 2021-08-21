import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { selectImage } from "../../redux/appSlice";
import { useHistory } from "react-router-dom";

const Post = ({ id, username, imageUrl, profilePic, timestamp }) => {
     const dispatch = useDispatch();
     const history = useHistory();

     const open = () => {
          // db.collection("posts").doc(id).set(
          //      {
          //           read: true,
          //      },
          //      { merge: true }
          // );
          dispatch(selectImage(imageUrl));
          history.push("/status/view");
     };

     return (
          <div onClick={open} className="post">
               {profilePic ? (
                    <img
                         className="profilePic"
                         src={profilePic}
                         alt={username}
                    />
               ) : (
                    <span className="profilePic">
                         {username && username[0].toUpperCase()}
                    </span>
               )}
               <div className="post_info">
                    <h2>{username}</h2>
                    <p>
                         Tap to view <span>&middot;</span>{" "}
                         {moment(new Date(timestamp?.toDate())).fromNow()}
                    </p>
               </div>
          </div>
     );
};

export default Post;
