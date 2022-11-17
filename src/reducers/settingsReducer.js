import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "mobile",
    desktopBackgrounds: [
        {
            backgroudColor: "#0093E9",
            backgroudImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
        },{
            backgroudColor: "#4158D0",
            backgroudImage: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
        },{
            backgroudColor : "#00DBDE",
            backgroudImage : "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)"
        },{
            backgroudColor : "#FBAB7E",
            backgroudImage : "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)"
        },{
            backgroudColor : "#85FFBD",
            backgroudImage : "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)"
        },{
            backgroudColor : "#FFE53B",
            backgroudImage : "linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)"
        },{
            backgroudColor : "#FA8BFF",
            backgroudImage : "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)"
        },{
            backgroudColor : "#FF9A8B",
            backgroudImage : "linear-gradient(90deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)"
        },{
            backgroudColor : "#FF3CAC",
            backgroudImage : "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)"
        }
    ]
}

const settingsReducer = createSlice({
    name: "settingsReducer",
    initialState,
    reducers: {
        actionSetOperationMode: (state, action) => {
            // payload string "mobile" or "desktop"
            state.mode = action.payload
        }
    },
});

export const { actionSetOperationMode } = settingsReducer.actions;
export default settingsReducer.reducer;
