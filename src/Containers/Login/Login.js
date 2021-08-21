import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "boxicons";

import { auth, provider } from "../../firebase/firebase";
import { login } from "../../redux/appSlice";
import "./Login.css";

const Login = () => {
     const dispatch = useDispatch();
     const history = useHistory();

     const signIn = () => {
          auth.signInWithPopup(provider)
               .then((result) => {
                    dispatch(
                         login({
                              username: result.user.displayName,
                              profilePic: result.user.photoURL,
                              id: result.user.uid,
                         })
                    );
                    history.push("/");
               })
               .catch((err) => console.log(err.message));
     };

     return (
          <div className="login">
               <div className="login_container">
                    <i className="snapchat-logo bx bxl-snapchat"></i>
                    <button onClick={signIn}>Sign in</button>
               </div>
          </div>
     );
};

export default Login;
