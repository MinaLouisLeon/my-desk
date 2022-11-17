/*
  
 */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  apps: [
    {
      appName: "Folders",
      icon: "folder",
    },
    {
      appName: "Settings",
      icon: "settings",
    },
  ],
  appsData: [],
  taskbarOpenedApps: [],
  lastZIndex: 2,
  backgroud : {
    backgroudColor : "#0093E9",
    backgroudImage : "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
  }
};

const desktopModeReducer = createSlice({
  name: "desktopModeReducer",
  initialState,
  reducers: {
    actionOpenApp: (state, action) => {
      //args appName , icon , layout
      state.appsData.push({
        appName: action.payload.appName,
        icon: action.payload.icon,
        status: {
          isOpen: true,
          size: "default",
          isFullscreen: false,
          isMin: false,
          zIndex: state.lastZIndex + 1,
        },
        dataGrid: {
          i: action.payload.appName,
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          minH: 4,
          maxH: 8,
          minW: 4,
          maxW: 12,
        },
        lastDataGrid: null,
      });
      state.taskbarOpenedApps.push({
        appName: action.payload.appName,
        icon: action.payload.icon,
      });
      state.lastZIndex = state.lastZIndex + 1;
    },
    actionCloseApp: (state, action) => {
      // payload appName
      let appIndex = null;
      // eslint-disable-next-line
      state.appsData.map((app, index) => {
        if (app.appName === action.payload) {
          appIndex = index;
        }
      });
      state.appsData.splice(appIndex, 1);
      state.taskbarOpenedApps.splice(appIndex, 1);
    },
    actionUpdateAppDataGrid: (state, action) => {
      // args layout
      // eslint-disable-next-line
      state.appsData.map((app) => {
        // eslint-disable-next-line
        action.payload.map((item) => {
          if (app.appName === item.i) {
            return (
              (app.status.isFullscreen = false),
              (app.dataGrid = {
                x: item.x,
                y: item.y,
                w: item.w,
                h: item.h,
                minH: item.minH,
                maxH: item.maxH,
                minW: item.minW,
                maxW: item.maxW,
              })
            );
          }
        });
      });
    },
    actionToggleAppFullscreen: (state, action) => {
      //payload appName
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appName === action.payload) {
          if (!app.status.isFullscreen) {
            return (
              (app.lastDataGrid = app.dataGrid),
              (app.dataGrid = {
                i: action.payload.appName,
                x: 0,
                y: 0,
                w: 12,
                h: 8,
                minH: 4,
                maxH: 8,
                minW: 4,
                maxW: 12,
              }),
              (app.status.isFullscreen = true),
              (app.status.zIndex = state.lastZIndex + 1),
              (state.lastZIndex = state.lastZIndex + 1)
            );
          } else {
            return (
              (app.dataGrid = app.lastDataGrid),
              (app.lastDataGrid = null),
              (app.status.isFullscreen = false)
            );
          }
        }
      });
    },
    actionToggleAppMin: (state, action) => {
      //payload appName
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appName === action.payload) {
          app.status.isMin = !app.status.isMin;
        }
      });
    },
    actionUpdateZIndex: (state, action) => {
      // payload appName
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appName === action.payload) {
          return (
            app.status.zIndex = state.lastZIndex + 1,
            state.lastZIndex = state.lastZIndex + 1
          )
        }
      })
    }
  },
});

export const {
  actionOpenApp,
  actionCloseApp,
  actionUpdateAppDataGrid,
  actionToggleAppFullscreen,
  actionToggleAppMin,
  actionUpdateZIndex
} = desktopModeReducer.actions;
export default desktopModeReducer.reducer;
