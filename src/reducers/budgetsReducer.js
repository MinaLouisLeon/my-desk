/* normal  budget structure
    budgetId : 
    budgetFolder : 
    budgetName : 
    budgetType : 
    inTrash : false,
    totalBudget : 0,
    data : [
        type : 
        amount : 
        label : 
    ]
*/
/* custody  budget structure
    budgetId : 
    budgetFolder : 
    budgetName : 
    budgetType : 
    inTrash : false,
    totalBudget : 0,
    data : [
        type : 
        amount : 
        label :
        status : {
            isSubmitted : false,
            isTransferred : false
        }
    ]
*/
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isbudgetOpenedInDesktop: false,
  didBudgetExist: false,
  budgetsData: [],
  selectedBudget: [],
};

const budgetsReducer = createSlice({
  name: "budgetsReducer",
  initialState,
  reducers: {
    actionResetDidBudgetExist: (state, action) => {
      state.didBudgetExist = false;
    },
    actionAddBudget: (state, action) => {
      //args : budgetFolder,budgetName,BudgetType,folderIndex,custodyAmount
      let budgetId = `${action.payload.budgetFolder}-${action.payload.budgetName}`;
      let budgetExistItem = state.budgetsData.filter((item) => {
        return item["budgetId"].includes(budgetId);
      });
      if (budgetExistItem.length !== 0) {
        state.didBudgetExist = true;
      } else {
        if (
          action.payload.budgetType === "normal" ||
          action.payload.budgetType === "custody"
        ) {
          state.budgetsData.push({
            budgetId: budgetId,
            budgetFolder: action.payload.budgetFolder,
            budgetName: action.payload.budgetName,
            budgetType: action.payload.budgetType,
            inTrash: false,
            totalBudget:
              action.payload.budgetType === "normal"
                ? 0
                : action.payload.custodyAmount,
            data: [],
          });
        } else if (action.payload.budgetType === "daily") {
          //TODO: handle add daily budget in reducer
        }
      }
    },
    actionDeleteBudget: (state, action) => {
      // payload budgetName , budgetFolder
      let budgetId = `${action.payload.budgetFolder}-${action.payload.budgetName}`;
      // eslint-disable-next-line
      state.budgetsData.map((item) => {
        if (item.budgetId === budgetId) {
          return (
            (item.budgetId = `${item.budgetId}-trash`), (item.inTrash = true)
          );
        }
      });
    },
    actionSetSelectedBudget: (state, action) => {
      //args folderName , budegtName
      let budgetId = `${action.payload.folderName}-${action.payload.budgetName}`;
      let filteredBudget = state.budgetsData.filter((item) => {
        return item["budgetId"].includes(budgetId);
      });
      state.selectedBudget = filteredBudget;
    },
    actionAddAmountToBudget: (state, action) => {
      //args type (income,expens), label , amount,status
      let budgetId = state.selectedBudget[0].budgetId;
      let totalBudget = parseFloat(state.selectedBudget[0].totalBudget);
      if (action.payload.type === "income") {
        totalBudget = totalBudget + parseFloat(action.payload.amount);
      } else {
        totalBudget = totalBudget - parseFloat(action.payload.amount);
      }
      // push budget data and edit totalBudget
      let newBudgetData = null;
      // eslint-disable-next-line
      state.budgetsData.map((item) => {
        if (item.budgetId === budgetId) {
          //add amount to normal budget
          if (item.budgetType === "normal") {
            return (
              (item.totalBudget = totalBudget),
              item.data.push({
                type: action.payload.type,
                amount: action.payload.amount,
                label: action.payload.label,
              }),
              (newBudgetData = item)
            );
          }
          // add expens to custody
          else if (item.budgetType === "custody") {
            return (
              (item.totalBudget = totalBudget),
              item.data.push({
                type: action.payload.type,
                amount: action.payload.amount,
                label: action.payload.label,
                status: {
                  isSubmitted: false,
                  isTransferred: false,
                },
              }),
              (newBudgetData = item)
            );
          }
          //TODO: add handler to daily
        }
      });
      state.selectedBudget[0] = newBudgetData;
    },
    actionSetCustdyExpensStatus: (state, action) => {
      // args isSubmitted , isTransferred , index , amount
      let budgetId = state.selectedBudget[0].budgetId;
      let totalBudget = parseFloat(state.selectedBudget[0].totalBudget);
      let newBudgetData = null;
      // eslint-disable-next-line
      state.budgetsData.map((budget) => {
        if (budget.budgetId === budgetId) {
          if (action.payload.isSubmitted) {
            if (action.payload.isTransferred) {
              totalBudget = totalBudget + parseFloat(action.payload.amount);
            } else {
              if (budget.data[action.payload.index].status.isTransferred) {
                totalBudget = totalBudget - parseFloat(action.payload.amount);
              }
            }
            return (
              (budget.totalBudget = totalBudget),
              (budget.data[action.payload.index].status = {
                isSubmitted: action.payload.isSubmitted,
                isTransferred: action.payload.isTransferred,
              }),
              (newBudgetData = budget)
            );
          }else{
            totalBudget = totalBudget - parseFloat(action.payload.amount);
            return (
              (budget.totalBudget = totalBudget),
              (budget.data[action.payload.index].status = {
                isSubmitted: false,
                isTransferred: false,
              }),
              (newBudgetData = budget)
            );
          }
        }
      });
      state.selectedBudget[0] = newBudgetData;
    },
    actionOpenBudgetInDesktopMode: (state, action) => {
      state.isbudgetOpenedInDesktop = true;
    },
  },
  extraReducers: {
    // eslint-disable-next-line
    ["foldersReducer/actionDeleteFolder"]: (state, action) => {
      // payload folderIndex int , folderName string
      // eslint-disable-next-line
      state.budgetsData.map((item) => {
        if (item.budgetFolder === action.payload.folderName) {
          return (
            (item.inTrash = true), (item.budgetId = `${item.budgetId}-trash`)
          );
        }
      });
    },
    // eslint-disable-next-line
    ["desktopModeReducer/actionCloseApp"]: (state, action) => {
      if (state.isbudgetOpenedInDesktop && action.payload.includes("Budget")) {
        state.isbudgetOpenedInDesktop = false;
      }
    },
  },
});

export const {
  actionResetDidBudgetExist,
  actionAddBudget,
  actionDeleteBudget,
  actionSetSelectedBudget,
  actionAddAmountToBudget,
  actionSetCustdyExpensStatus,
  actionOpenBudgetInDesktopMode,
} = budgetsReducer.actions;
export default budgetsReducer.reducer;
