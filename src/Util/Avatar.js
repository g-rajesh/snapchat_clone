import React from "react";
import { auth } from "../firebase/firebase";
import { useHistory } from "react-router-dom";

function Avatar({ profilePic, username }) {
     const history = useHistory();

     if (profilePic)
          return (
               <img
                    onClick={() => {
                         auth.signOut();
                         history.push("/login");
                    }}
                    className="avatar"
                    src={profilePic}
                    alt={username}
                    title="logout"
               />
          );
     return (
          <span
               onClick={() => {
                    auth.signOut();
                    history.push("/login");
               }}
               className="avatar"
          >
               S
          </span>
     );
}

export default Avatar;
