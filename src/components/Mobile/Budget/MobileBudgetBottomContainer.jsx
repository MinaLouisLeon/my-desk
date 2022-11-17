import React from 'react'
import styled from "styled-components";
import {IonButton,IonItem,IonLabel} from "@ionic/react"
const BudgetBottomContainer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  height: auto;
  border-top-style: solid;
  border-top-color: #ccc;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const MobileBudgetBottomContainer = ({budgetType,setAmountType,setPopoverState,totalBudget}) => {
  return (
    <BudgetBottomContainer className="pa2">
        {budgetType === "custody" ? (
          // remove add income in custody view
          <IonButton
            color="danger"
            expand="block"
            className="ml3 mr3"
            onClick={(e) => {
              setAmountType("expens");
              setPopoverState({
                isOpen: true,
                e: e,
              });
            }}
          >
            Add Expens
          </IonButton>
        ) : (
          <BtnContainer>
            <IonButton
              color="success"
              onClick={
                (e) => {
                setAmountType("income");
                setPopoverState({
                  isOpen: true,
                  e: e,
                });
              }}
            >
              Add Income
            </IonButton>
            <IonButton
              color="danger"
              onClick={
                (e) => {
                setAmountType("expens");
                setPopoverState({
                  isOpen: true,
                  e: e,
                });
              }}
            >
              Add Expens
            </IonButton>
          </BtnContainer>
        )}
        <IonItem className="ma3 br4 shadow-2">
          <IonLabel slot="start">Total Budget:</IonLabel>
          <IonLabel
            slot="end"
            color={totalBudget >= 0 ? "success" : "danger"}
          >
            {totalBudget}
          </IonLabel>
        </IonItem>
      </BudgetBottomContainer>
  )
}

export default MobileBudgetBottomContainer