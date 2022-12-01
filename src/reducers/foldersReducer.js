import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  didFolderExist: false,
  folders: [
    {
      label: "Personal",
      url: "/folder/Personal",
      data: [],
      inTrash: false,
    },
    {
      label: "Work",
      url: "/folder/Work",
      data: [],
      inTrash: false,
    },
  ],
};

const foldersReducer = createSlice({
  name: "foldersReducer",
  initialState,
  reducers: {
    actionResetDidFolderExist: (state, action) => {
      state.didFolderExist = false;
    },
    actionAddFolder: (state, action) => {
      /*
            args :  payload : string (label)
            */
      let label = action.payload;
      let checkFolderExistArr = state.folders.filter((item) => {
        return item["label"].includes(label);
      });
      if (checkFolderExistArr.length === 0) {
        state.folders.push({
          label: label,
          url: `/folder/${label}`,
          data: [],
          inTrash: false,
        });
      } else {
        state.didFolderExist = true;
      }
    },
    actionDeleteFolder: (state, action) => {
      // payload folderName string
      // eslint-disable-next-line
      state.folders.map((folder) => {
        if(folder.label === action.payload){
          return(
            folder.inTrash = true,
            folder.label = `${folder.label}-trash`
          )
        }     
      })
      // let index = parseInt(action.payload.folderIndex);
      // state.folders[index].inTrash = true;
      // state.folders[index].label = `${state.folders[index].label}-trash`;
    },
    actionDeletePermFolder: (state, action) => {
      // payload index of folder
      let index = parseInt(action.payload);
      state.folders.splice(index, 1);
    },
  },
  extraReducers: {
    // eslint-disable-next-line
    ["budgetsReducer/actionAddBudget"]: (state, action) => {
      //args : budgetFolder,budgetName,BudgetType,folderIndex,custodyAmount
      let folderData = state.folders[action.payload.folderIndex].data;
      let budgetExistItem = folderData.filter((item) => {
        return item["budgetName"].includes(action.payload.budgetName);
      });
      if (budgetExistItem.length === 0) {
        state.folders[action.payload.folderIndex].data.push({
          dataType: "budget",
          budgetName: action.payload.budgetName,
          budgetType: action.payload.budgetType,
          inTrash: false,
        });
      }
    },
    // eslint-disable-next-line
    ["budgetsReducer/actionDeleteBudget"]: (state, action) => {
      //args budgetFolder , budgetName
      let folderIndex = null;
      // eslint-disable-next-line
      state.folders.map((item, index) => {
        if (item.label === action.payload.budgetFolder) {
          folderIndex = index;
        }
      });
      // eslint-disable-next-line
      state.folders[folderIndex].data.map((item) => {
        if (
          item.dataType === "budget" &&
          item.budgetName === action.payload.budgetName
        ) {
          return (item.inTrash = true);
        }
      });
    },
  },
});

export const {
  actionResetDidFolderExist,
  actionAddFolder,
  actionDeleteFolder,
} = foldersReducer.actions;
export default foldersReducer.reducer;
