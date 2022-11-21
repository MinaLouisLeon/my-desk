import React from "react";
import styled from "styled-components";
const SubHeader = styled.div`
  width: 100%;
  height: 40px;
  background-color: #00000012;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;
const BudgetSubHeader = ({ label, totalBudget }) => {
  return (
    <SubHeader>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div className="fw6 pl2">{`${label} budget`}</div>
      </div>
      <div className="fw6 pr3">
        Total Budget:
        <span
          style={{ color: totalBudget >= 0 ? "#2dd36f" : "#eb445a" }}
          className="pl1"
        >
          {totalBudget}
        </span>
      </div>
    </SubHeader>
  );
};
export default BudgetSubHeader;
