import React from "react";
import { useSelector } from "react-redux";
import NormalBudgetComp from "../../components/Desktop/Budget/NormalBudgetComp";

const DesktopBudgetPage = () => {
  const selectedBudget = useSelector(
    (state) => state.budgetsReducer.selectedBudget[0]
  );
  if(selectedBudget.budgetType === "normal"){
    return (
      <NormalBudgetComp selectedBudget={selectedBudget} />
      );
  }
  //TODO: add custody handler
  
};

export default DesktopBudgetPage;
