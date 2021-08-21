import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "./Containers/Login/Login";
import Preview from "./Containers/Preview/Preview";
import Status from "./Containers/Status/Status";
import StatusView from "./Containers/Status/StatusView";
import WebcamCapture from "./Containers/WebcamCapture/WebcamCapture";
import { auth } from "./firebase/firebase";
import { login, logout, setAppSize } from "./redux/appSlice";
import DynamicRoute from "./Util/DynamicRoute";
import mobile from "./images/mobile.png";

function App() {
     const dispatch = useDispatch();

     useEffect(() => {
          auth.onAuthStateChanged((userState) => {
               if (userState) {
                    dispatch(
                         login({
                              username: userState?.displayName,
                              profilePic: userState?.photoURL,
                              id: userState?.uid,
                         })
                    );
               } else {
                    dispatch(logout());
               }
          });
     }, [dispatch]);

     useEffect(() => {
          window.addEventListener("resize", () => dispatch(setAppSize()));
     }, [dispatch]);

     return (
          <div className="App">
               <Router>
                    <div className="app_body">
                         <img className="mobile" src={mobile} alt="" />
                         <div className="app_background">
                              <Switch>
                                   <DynamicRoute path="/login" guest>
                                        <Login />
                                   </DynamicRoute>

                                   <DynamicRoute path="/preview" authenticated>
                                        <Preview />
                                   </DynamicRoute>
                                   <DynamicRoute
                                        path="/status/view"
                                        authenticated
                                   >
                                        <StatusView />
                                   </DynamicRoute>
                                   <DynamicRoute path="/webcam" authenticated>
                                        <WebcamCapture />
                                   </DynamicRoute>
                                   <DynamicRoute exact path="/" authenticated>
                                        <Status />
                                   </DynamicRoute>
                              </Switch>
                         </div>
                    </div>
               </Router>
          </div>
     );
}

export default App;
