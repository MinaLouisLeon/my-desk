import React from "react";
import styled from "styled-components";
import ContextMenuComp from "../ContextMenuComp";
import BudgetSubHeader from "./BudgetSubHeader";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import {
  actionDeleteBudget,
  actionAddAmountToBudget,
} from "../../../reducers/budgetsReducer";
import { actionCloseApp } from "../../../reducers/desktopModeReducer";
import {
  actionClosePopover,
  actionOpenPopover,
} from "../../../reducers/tempReducer";
import FormBtns from "../Forms/FormBtns";
const BudgetItem = styled.div`
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: thin;
  border-bottom-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const NormalBudgetComp = ({ selectedBudget, appKey }) => {
  const dispatch = useDispatch(null);
  const handleSubmitAddIncome = (e) => {
    e.preventDefault();
    dispatch(
      actionAddAmountToBudget({
        type: "income",
        label: e.target[0].value,
        amount: e.target[1].value,
      })
    );
    dispatch(actionClosePopover());
  };
  const AddIncomePopoverContent = (
    <div className="pa2">
      <Form onSubmit={handleSubmitAddIncome}>
        <Form.Group>
          <Form.Label>Income Label:</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Income Amount:</Form.Label>
          <Form.Control type="number" step="0.01" required />
        </Form.Group>
        <FormBtns submitBtnName="Add" />
      </Form>
    </div>
  );
  const handleSubmitAddExpens = (e) => {
    e.preventDefault();
    dispatch(
      actionAddAmountToBudget({
        type: "expens",
        label: e.target[0].value,
        amount: e.target[1].value,
      })
    );
    dispatch(actionClosePopover());
  };
  const addExpensPopoverContent = (
    <div className="pa2">
      <Form onSubmit={handleSubmitAddExpens}>
        <Form.Group>
          <Form.Label>Expens Label:</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Expens Amount:</Form.Label>
          <Form.Control type="number" step="0.01" required />
        </Form.Group>
        <FormBtns submitBtnName="Add" />
      </Form>
    </div>
  );
  return (
    <div style={{ width: "100%", height: "100%" }} id="NormalBudgetContextId">
      <ContextMenuComp
        targetId="NormalBudgetContextId"
        options={[
          {
            text: "Add Income",
            color: "success",
            icon: "add",
            handler: () => dispatch(actionOpenPopover(AddIncomePopoverContent)),
          },
          {
            text: "Add Expens",
            color: "danger",
            icon: "add",
            handler: () => dispatch(actionOpenPopover(addExpensPopoverContent)),
          },
          {
            text: "Delete Budget",
            color: "danger",
            icon: "trash",
            handler: () => {
              dispatch(
                actionDeleteBudget({
                  budgetName: selectedBudget.budgetName,
                  budgetFolder: selectedBudget.budgetFolder,
                  budgetType: "normal",
                })
              );
              dispatch(actionCloseApp(appKey));
            },
          },
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
              <span
                style={{
                  color: item.type === "expens" ? "#eb445a" : "#2dd36f",
                }}
              >
                {item.amount}
              </span>
            </BudgetItem>
          );
        })}
      </div>
    </div>
  );
};

export default NormalBudgetComp;
