import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     user: null,
     selectedImage: null,
     appSize: window.innerWidth,
};

export const appSlice = createSlice({
     name: "app",
     initialState,
     reducers: {
          login: (state, action) => {
               state.user = action.payload;
          },
          logout: (state) => {
               state.user = null;
          },
          selectImage: (state, action) => {
               state.selectedImage = action.payload;
          },
          resetImage: (state) => {
               state.selectedImage = null;
          },
          setAppSize: (state) => {
               state.appSize = window.innerWidth;
          },
     },
});

export const { login, logout, selectImage, resetImage, setAppSize } =
     appSlice.actions;

export const selectUser = (state) => state.app.user;
export const selectSelectedImage = (state) => state.app.selectedImage;
export const selectAppSize = (state) => state.app.appSize;

export default appSlice.reducer;
