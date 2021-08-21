import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { resetImage, selectSelectedImage } from "../../redux/appSlice";
import "./Status.css";

const StatusView = () => {
     const selectedImage = useSelector(selectSelectedImage);
     const dispatch = useDispatch();
     const history = useHistory();

     useEffect(() => {
          if (!selectedImage) {
               history.push("/");
          }
     }, [selectedImage, history]);

     const exit = () => {
          dispatch(resetImage());
          history.push("/");
     };

     return (
          <div onClick={exit} className="status_view">
               <img src={selectedImage} alt={selectedImage} />
               {selectedImage && (
                    <div className="status_timer">
                         <CountdownCircleTimer
                              isPlaying
                              duration={10}
                              size={35}
                              strokeWidth={3}
                              colors={[
                                   ["#2DC937", 0.33],
                                   ["#2DC937", 0.33],
                                   ["#CC3232", 0.33],
                              ]}
                         >
                              {({ remainingTime }) => {
                                   if (remainingTime === 0) {
                                        history.push("/");
                                   }
                                   return remainingTime;
                              }}
                         </CountdownCircleTimer>
                    </div>
               )}
          </div>
     );
};

export default StatusView;
