import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "mobile",
  settingsView: "mainList",
  desktopBackgrounds: [
    {
      backgroundColor: "#0093E9",
      backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    },
    {
      backgroundColor: "#4158D0",
      backgroundImage:
        "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    },
    {
      backgroundColor: "#00DBDE",
      backgroundImage: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
    },
    {
      backgroundColor: "#FBAB7E",
      backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
    },
    {
      backgroundColor: "#85FFBD",
      backgroundImage: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)",
    },
    {
      backgroundColor: "#FFE53B",
      backgroundImage: "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
    },
    {
      backgroundColor: "#FA8BFF",
      backgroundImage:
        "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
    },
    {
      backgroundColor: "#FF9A8B",
      backgroundImage:
        "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)",
    },
    {
      backgroundColor: "#FF3CAC",
      backgroundImage:
        "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",
    },
  ],
};

const settingsReducer = createSlice({
  name: "settingsReducer",
  initialState,
  reducers: {
    actionSetOperationMode: (state, action) => {
      // payload string "mobile" or "desktop"
      state.mode = action.payload;
    },
    actionChangeDesktopSettingsView: (state, action) => {
      // payload string view
      state.settingsView = action.payload;
    },
  },
  extraReducers: {
    // eslint-disable-next-line
    ["desktopModeReducer/actionCloseApp"]: (state, action) => {
      if (action.payload.includes("Settings")) {
        state.settingsView = "mainList";
      }
    },
  },
});

export const { actionSetOperationMode, actionChangeDesktopSettingsView } =
  settingsReducer.actions;
export default settingsReducer.reducer;
