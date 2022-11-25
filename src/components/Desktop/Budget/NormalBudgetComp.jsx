import React from 'react'
import styled from "styled-components";
import ContextMenuComp from '../ContextMenuComp';
import BudgetSubHeader from './BudgetSubHeader';
const BudgetItem = styled.div`
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: thin;
  border-bottom-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const NormalBudgetComp = ({selectedBudget}) => {
  return (
    <div style={{width:"100%",height:"100%"}} id="NormalBudgetContextId">
        <ContextMenuComp 
            targetId="NormalBudgetContextId"
            options={[
                {
                    text : "Add Income",
                    color : "success",
                    icon : "add",
                    //TODO: add handler
                },{
                    text :"Add Expens",
                    color : "danger",
                    icon : "add"
                    //TODO: add handler
                }
            ]}
        />
      <BudgetSubHeader
        label={selectedBudget.budgetName}
        totalBudget={selectedBudget.totalBudget}
      />
      <div style={{ width: "100%" }}>
        {selectedBudget.data.map((item) => {
          return (
            <BudgetItem className="pa2 pl3">
              <span>{item.label}</span>
              <span style={{color:item.type === "expens" ? "#eb445a" : "#2dd36f"}}>{item.amount}</span>
            </BudgetItem>
          );
        })}
      </div>
    </div>
  )
}

export default NormalBudgetComp