import React from "react";
import BudgetSubHeader from "./BudgetSubHeader";
import ContextMenuComp from "../ContextMenuComp";
import styled from "styled-components";
import CheckBoxItem from "../Forms/CheckBoxItem";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import {
  actionClosePopover,
  actionOpenPopover,
} from "../../../reducers/tempReducer";
import FormBtns from "../Forms/FormBtns";
import { actionSetCustdyExpensStatus } from "../../../reducers/budgetsReducer";
const BudgetItem = styled.div`
  width: 100%;
  border-bottom-style: solid;
  border-bottom-width: thin;
  border-bottom-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const CustodyBudgetComp = ({ selectedBudget }) => {
  const dispatch = useDispatch(null);
  const handleSubmitExpensState = (e, index, amount) => {
    e.preventDefault();
    console.log(e);
    dispatch(
      actionSetCustdyExpensStatus({
        isSubmitted: e.target[0].checked,
        isTransferred: e.target[1].checked,
        index: index,
        amount: amount,
      })
    );
    dispatch(actionClosePopover());
  };
  return (
    <div style={{ width: "100%", height: "100%" }} id="CustodyBudgetContextId">
      <ContextMenuComp
        targetId="CustodyBudgetContextId"
        options={[
          {
            text: "Add Expens",
            color: "danger",
            icon: "add",
            //TODO: add handler
          },
        ]}
      />
      <BudgetSubHeader
        label={selectedBudget.budgetName}
        totalBudget={selectedBudget.totalBudget}
      />
      <div style={{ width: "100%" }}>
        {selectedBudget.data.map((item, index) => {
          return (
            <BudgetItem
              className="pa2 pl3 pointer"
              onClick={() => {
                dispatch(
                  actionOpenPopover(
                    <div className="ma2">
                      <Form
                        onSubmit={(e) =>
                          handleSubmitExpensState(e, index, item.amount)
                        }
                      >
                        <Form.Group>
                          <CheckBoxItem
                            label="Is Submitted ?"
                            checked={item.status.isSubmitted}
                            type="switch"
                          />
                          <CheckBoxItem
                            label="Is Transferred ?"
                            checked={item.status.isTransferred}
                            type="switch"
                          />
                        </Form.Group>
                        <FormBtns submitBtnName="Save" />
                      </Form>
                    </div>
                  )
                );
              }}
            >
              {item.status.isTransferred ? (
                <s>
                  <span>{item.label}</span>
                </s>
              ) : (
                <span>{item.label}</span>
              )}
              {item.status.isTransferred ? (
                <s>
                  <span
                    style={{
                      color: item.type === "expens" ? "#eb445a" : "#2dd36f",
                    }}
                  >
                    {item.amount}
                  </span>
                </s>
              ) : (
                <span
                  style={{
                    color: item.type === "expens" ? "#eb445a" : "#2dd36f",
                  }}
                >
                  {item.amount}
                </span>
              )}
            </BudgetItem>
          );
        })}
      </div>
    </div>
  );
};

export default CustodyBudgetComp;
