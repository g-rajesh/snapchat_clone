import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Webcam from "react-webcam";

import { setCameraImage } from "../../redux/cameraSlice";
import "./WebcamCapture.css";
import { useHistory } from "react-router-dom";
import { selectAppSize } from "../../redux/appSlice";

function WebcamCapture() {
     const appSize = useSelector(selectAppSize);
     const dispatch = useDispatch();
     const webcamRef = useRef(null);
     const history = useHistory();

     const videoConstraints = {
          width: appSize > 500 ? 248 : window.innerWidth,
          height: appSize > 500 ? 342 : window.innerHeight,
          facingMode: "user",
     };

     console.log(videoConstraints);

     const capture = useCallback(() => {
          const imageSrc = webcamRef.current.getScreenshot();
          dispatch(setCameraImage(imageSrc));
          history.push("/preview");
     }, [webcamRef, dispatch, history]);

     return (
          <div className="webcamCapture">
               <Webcam
                    audio={false}
                    height={videoConstraints.height}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={videoConstraints.width}
                    videoConstraints={videoConstraints}
               />

               <button className="captureIcon" onClick={capture}></button>
          </div>
     );
}

export default WebcamCapture;
