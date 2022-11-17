import { Button } from "@blueprintjs/core";
import React from "react";
import styled from "styled-components";
import IconProviderComp from "../Icons/IconProviderComp";
import { useDispatch } from "react-redux";
import { actionCloseBudgetInDesktopMode } from "../../../reducers/budgetsReducer";
const SubHeader = styled.div`
  width: 100%;
  height: 40px;
  background-color: #00000012;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const BudgetSubHeader = ({ label ,totalBudget}) => {
  const dispatch = useDispatch(null);
  return (
    <SubHeader>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-start",alignItems:"center"}}>
      <Button
        minimal
        onClick={() => dispatch(actionCloseBudgetInDesktopMode())}
        icon={
          <IconProviderComp
            iconName="goBack"
            settings={{ size: "2rem" }}
            className="pl2 pr2"
          />
        }
      />
      <div className="fw6 pl2">{`${label} budget`}</div>
      </div>
      <div className="fw6 pr3">Total Budget:
      <span style={{color:totalBudget >= 0 ? "#2dd36f" : "#eb445a"}} className="pl1">{totalBudget}</span>
      </div>
    </SubHeader>
  );
};
export default BudgetSubHeader;
