import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "boxicons";

import { db } from "../../firebase/firebase";
import { resetCameraImage } from "../../redux/cameraSlice";
import { selectUser } from "../../redux/appSlice";
import Avatar from "../../Util/Avatar";
import Post from "./Post";
import "./Status.css";

function Status() {
     const [posts, setPosts] = useState([]);
     const [fetchedPosts, setFetchedPosts] = useState([]);
     const user = useSelector(selectUser);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          db.collection("posts")
               .orderBy("timestamp", "desc")
               .onSnapshot((snapshot) => {
                    let status = snapshot.docs.map((doc) => ({
                         id: doc.id,
                         data: doc.data(),
                    }));
                    setFetchedPosts(status);
                    setPosts(status);
               });
     }, []);

     const filterPosts = (val) => {
          setPosts(() => {
               return fetchedPosts.filter((post) =>
                    post.data.username.toLowerCase().includes(val)
               );
          });
     };

     const takeSnap = () => {
          dispatch(resetCameraImage());
          history.push("/webcam");
     };

     const alertUser = () => {
          alert("Working on it! Please come later");
     };

     return (
          <div className="status">
               <div className="status_header">
                    <Avatar {...user} />
                    <div className="status_search">
                         <i className="searchIcon bx bx-search"></i>
                         <input
                              type="text"
                              name="search"
                              id="search"
                              placeholder="Friends"
                              onChange={(e) =>
                                   filterPosts(e.target.value.toLowerCase())
                              }
                              autoComplete="off"
                         />
                    </div>
                    <i onClick={alertUser} className="chatIcon bx bxs-chat"></i>
               </div>

               <div className="posts">
                    {posts.length > 0 ? (
                         posts.map((post) => (
                              <Post
                                   key={post?.id}
                                   id={post?.id}
                                   {...post?.data}
                              />
                         ))
                    ) : (
                         <p className="alertUser">No users found!</p>
                    )}
                    <button
                         className="captureIcon"
                         onClick={() => takeSnap()}
                    ></button>
               </div>
          </div>
     );
}

export default Status;
