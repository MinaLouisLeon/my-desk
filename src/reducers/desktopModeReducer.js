/*
  apps : [
    {
      appName : string
      icon : string IconProviderComp
      appContentType : string
    }
  ]
  appsData : [
    appName : string
    icon : string IconProviderComp
    appKey : auto
    label : string or null
    appContent : array or string url or null
    appMemory : array memory of appContent
    appContentType : string 
    status : {
      isOpen: bool,
      size: string,
      isFullscreen: bool,
      isMin: boll,
      zIndex: auto,
    },
    dataGrid : {
      i: auto,
      x: number,
      y: number,
      w: number,
      h: number,
      minH: number,
      maxH: number,
      minW: number,
      maxW: number,
    }
    lastDataGrid : null or auto object copy of dataGrid
  ]
 */
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  apps: [
    {
      appName: "Folders",
      icon: "folder",
      appContentType: "folders",
    },
    {
      appName: "Settings",
      icon: "settings",
      appContentType: "settings",
    },{
      appName : "Browser",
      icon : "browser",
      appContentType : "browser"
    }
  ],
  isSettingsOpened: false,
  appsData: [],
  taskbarOpenedApps: [],
  lastZIndex: 2,
  backgroud: {
    backgroundColor: "#0093E9",
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
  },
};

const desktopModeReducer = createSlice({
  name: "desktopModeReducer",
  initialState,
  reducers: {
    actionOpenApp: (state, action) => {
      //args appName , icon  , appContentType
      let startOpenApp = false;
      if (!state.isSettingsOpened && action.payload.appName === "Settings") {
        state.isSettingsOpened = true;
        startOpenApp = true;
      } else if (
        action.payload.appName !== "Settings"
      ) {
        startOpenApp = true;
      }
      if (startOpenApp) {
        state.lastZIndex = state.lastZIndex + 1;
        let l = state.appsData.length;
        state.appsData.push({
          appName: action.payload.appName,
          icon: action.payload.icon,
          appKey: `${action.payload.appName}-${l}`,
          label: null,
          appContent: null,
          folderIndex: null,
          appMemory: [],
          appContentType: action.payload.appContentType,
          status: {
            isOpen: true,
            size: "default",
            isFullscreen: false,
            isMin: false,
            zIndex: state.lastZIndex + 1,
          },
          dataGrid: {
            i: `${action.payload.appName}-${l}`,
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
          appKey: `${action.payload.appName}-${l}`,
        });
        state.lastZIndex = state.lastZIndex + 1;
      }
    },
    actionCloseApp: (state, action) => {
      // payload appKey
      if(action.payload.includes("Settings")){
        state.isSettingsOpened = false
      }
      let appIndex = null;
      // eslint-disable-next-line
      state.appsData.map((app, index) => {
        if (app.appKey === action.payload) {
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
          if (app.appKey === item.i) {
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
      //payload appKey
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appKey === action.payload) {
          if (!app.status.isFullscreen) {
            return (
              (app.lastDataGrid = app.dataGrid),
              (app.dataGrid = {
                i: action.payload,
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
        } else {
          app.status.isMin = !app.status.isMin;
        }
      });
    },
    actionToggleAppMin: (state, action) => {
      //payload appKey
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appKey === action.payload) {
          state.lastZIndex = state.lastZIndex + 1;
          app.status.zIndex = state.lastZIndex;
          app.status.isMin = !app.status.isMin;
        }
      });
    },
    actionUpdateZIndex: (state, action) => {
      // payload appKey
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appKey === action.payload) {
          return (
            (app.status.zIndex = state.lastZIndex + 1),
            (state.lastZIndex = state.lastZIndex + 1)
          );
        }
      });
    },
    actionOpenInFolder: (state, action) => {
      // appKey appContent ,appContentType, label , index
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appKey === action.payload.appKey) {
          return (
            app.appMemory.push({
              appContent: app.appContent,
              appContentType: app.appContentType,
              label: app.label,
            }),
            (app.appContentType = action.payload.appContentType),
            (app.appContent = action.payload.appContent),
            (app.label = action.payload.label),
            (app.folderIndex = action.payload.index)
          );
        }
      });
    },
    actionCloseInFolder: (state, action) => {
      // payload appKey
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appKey === action.payload) {
          let data = app.appMemory.pop();
          app.appContent = data.appContent;
          app.appContentType = data.appContentType;
          app.label = data.label;
        }
      });
    },
    actionSetBackground: (state, action) => {
      //args backgroundColor , backGroundImage
      state.backgroud = {
        backgroundColor: action.payload.backgroundColor,
        backgroundImage: action.payload.backgroundImage,
      };
    },
  },
  extraReducers: {
    // eslint-disable-next-line
    ["budgetsReducer/actionAddBudget"]: (state, action) => {
      //args : budgetName,BudgetType, appKey
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.appKey === action.payload.appKey) {
          let didBudgetExist = false;
          // eslint-disable-next-line
          app.appContent.map((item) => {
            if (item.dataType === "budget") {
              if (item.budgetName === action.payload.budgetName) {
                didBudgetExist = true;
              }
            }
          });
          if (!didBudgetExist) {
            return app.appContent.push({
              dataType: "budget",
              budgetName: action.payload.budgetName,
              budgetType: action.payload.budgetType,
              inTrash: false,
            });
          }
        }
      });
    },
    // eslint-disable-next-line
    ["budgetsReducer/actionDeleteBudget"]: (state, action) => {
      // payload budgetName , budgetFolder,budgetType
      // eslint-disable-next-line
      state.appsData.map((app) => {
        if (app.label === action.payload.budgetFolder) {
          // eslint-disable-next-line
          app.appContent.map((item) => {
            if (item.dataType === "budget") {
              if (item.budgetType === action.payload.budgetType) {
                return (item.inTrash = true);
              }
            }
          });
        }
      });
    },
  },
});

export const {
  actionOpenApp,
  actionCloseApp,
  actionUpdateAppDataGrid,
  actionToggleAppFullscreen,
  actionToggleAppMin,
  actionUpdateZIndex,
  actionOpenInFolder,
  actionCloseInFolder,
  actionSetBackground,
} = desktopModeReducer.actions;
export default desktopModeReducer.reducer;
