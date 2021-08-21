import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import cameraReducer from "./cameraSlice";

export const store = configureStore({
     reducer: {
          app: appReducer,
          camera: cameraReducer,
     },
});
