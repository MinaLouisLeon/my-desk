import React from "react";
import { useSelector } from "react-redux";
import NormalBudgetComp from "../../components/Desktop/Budget/NormalBudgetComp";
import CustodyBudgetComp from "../../components/Desktop/Budget/CustodyBudgetComp";

const DesktopBudgetPage = ({appKey}) => {

  const selectedBudget = useSelector(
    (state) => state.budgetsReducer.selectedBudget[0]
  );
  if(selectedBudget.budgetType === "normal"){
    return (
      <NormalBudgetComp selectedBudget={selectedBudget} appKey={appKey} />
      );
  }else if(selectedBudget.budgetType === "custody"){
    return(
      <CustodyBudgetComp selectedBudget={selectedBudget} appKey={appKey} />
    )
  }  
};

export default DesktopBudgetPage;
