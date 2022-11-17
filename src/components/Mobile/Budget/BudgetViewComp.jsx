import React, { useState } from "react";
import {
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonPopover,
  IonList,
  IonInput,
  IonTextarea,
  IonCheckbox,
} from "@ionic/react";
import { useDispatch } from "react-redux";
import {
  actionAddAmountToBudget,
  actionSetCustdyExpensStatus,
} from "../../../reducers/budgetsReducer";
import styled from "styled-components";
import MobileBudgetBottomContainer from "./MobileBudgetBottomContainer";

const PopoverBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const BudgetViewComp = ({ selectedBudget }) => {
  const dispatch = useDispatch(null);
  const [popoverState, setPopoverState] = useState({
    isOpen: false,
    e: undefined,
  });
  const [custodyItemPopoverState, setCustodyItemPopoverState] = useState({
    isOpen: false,
    e: undefined,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTransferred, setIsTransferred] = useState(false);
  const [statusItemIndex, setStatusItemIndex] = useState(null);
  const [statusItemAmount, setStatusItemAmount] = useState(null);
  const [amountType, setAmountType] = useState("");
  const [amountLabel, setAmountLabel] = useState("");
  const [amountValue, setAmountValue] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actionAddAmountToBudget({
        type: amountType,
        label: amountLabel,
        amount: amountValue,
      })
    );
    handleDismiss();
  };
  const handleDismiss = () => {
    setAmountLabel("");
    setAmountType("");
    setAmountValue(null);
    setPopoverState({
      isOpen: false,
      e: undefined,
    });
  };
  const handleSubmitCustodyItem = () => {
    dispatch(
      actionSetCustdyExpensStatus({
        isSubmitted: isSubmitted,
        isTransferred: isTransferred,
        index: statusItemIndex,
        amount: statusItemAmount,
      })
    );
    handleDismissCustodyItem();
  };
  const handleDismissCustodyItem = () => {
    setStatusItemIndex(null);
    setStatusItemAmount(null);
    setCustodyItemPopoverState({
      isOpen: false,
      e: undefined,
    });
  };
  return (
    <>
      {/* custody item details popover */}
      <IonPopover
        isOpen={custodyItemPopoverState.isOpen}
        onDidDismiss={() => handleDismissCustodyItem()}
      >
        <IonContent>
          <IonList>
            <IonItem lines="full">
              <IonLabel>Is Submitted ?</IonLabel>
              <IonCheckbox
                slot="end"
                checked={isSubmitted}
                onIonChange={(e) => setIsSubmitted(e.detail.checked)}
              />
            </IonItem>
            {isSubmitted && (
              <IonItem lines="full">
                <IonLabel>Is Transferred ?</IonLabel>
                <IonCheckbox
                  slot="end"
                  checked={isTransferred}
                  onIonChange={(e) => setIsTransferred(e.detail.checked)}
                />
              </IonItem>
            )}
            <PopoverBtnContainer className="ma1 mt2">
              <IonButton
                type="button"
                color="danger"
                className="mr2"
                onClick={() => handleDismissCustodyItem()}
              >
                Cancel
              </IonButton>
              <IonButton
                onClick={() => handleSubmitCustodyItem()}
                color="success"
                className="mr2"
              >
                Set
              </IonButton>
            </PopoverBtnContainer>
          </IonList>
        </IonContent>
      </IonPopover>
      {/* add expens or income to selected budget popover */}
      <IonPopover
        isOpen={popoverState.isOpen}
        onDidDismiss={() => handleDismiss()}
        className="br4 pa2"
      >
        <IonContent>
          <IonList>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel>Label:</IonLabel>
                <IonTextarea
                  required
                  autoGrow={true}
                  value={amountLabel}
                  onIonChange={(e) => setAmountLabel(e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Amount:</IonLabel>
                <IonInput
                  required
                  type="number"
                  step="0.01"
                  value={amountValue}
                  onIonChange={(e) => setAmountValue(e.detail.value)}
                />
              </IonItem>
              <PopoverBtnContainer className="ma1 mt2">
                <IonButton
                  type="button"
                  color="danger"
                  className="mr2"
                  onClick={() => handleDismiss()}
                >
                  Cancel
                </IonButton>
                <IonButton type="submit" color="success" className="mr2">
                  Add
                </IonButton>
              </PopoverBtnContainer>
            </form>
          </IonList>
        </IonContent>
      </IonPopover>
      {/* list to display budget content */}
      <IonList>
        {/* normal budget */}
        {selectedBudget.budgetType === "normal" &&
          selectedBudget.data.map((item) => {
            return (
              <IonItem lines="full" key={item.label}>
                <IonLabel slot="start" class="ion-text-wrap">
                  {item.label}
                </IonLabel>
                <IonLabel
                  slot="end"
                  color={item.type === "income" ? "success" : "danger"}
                >
                  {item.amount}
                </IonLabel>
              </IonItem>
            );
          })}
        {/* custody budget */}
        {selectedBudget.budgetType === "custody" &&
          selectedBudget.data.map((item, index) => {
            return (
              <IonItem
                lines="full"
                key={item.label}
                button
                onClick={(e) => {
                  setIsSubmitted(item.status.isSubmitted);
                  setIsTransferred(item.status.isTransferred);
                  setStatusItemIndex(index);
                  setStatusItemAmount(item.amount);
                  setCustodyItemPopoverState({
                    isOpen: true,
                    e: e,
                  });
                }}
              >
                <IonLabel slot="start" class="ion-text-wrap">
                  {item.status.isTransferred ? (
                    <s>{item.label}</s>
                  ) : (
                    <>{item.label}</>
                  )}
                </IonLabel>
                <IonLabel
                  slot="end"
                  color={item.type === "income" ? "success" : "danger"}
                >
                  {item.status.isTransferred ? (
                    <s>{item.amount}</s>
                  ) : (
                    <>{item.amount}</>
                  )}
                </IonLabel>
              </IonItem>
            );
          })}
      </IonList>
      {/* buttons and total budget view */}
      <MobileBudgetBottomContainer
        budgetType={selectedBudget.budgetType}
        setAmountType={setAmountType}
        setPopoverState={setPopoverState}
        totalBudget={selectedBudget.totalBudget}
      /> 
    </>
  );
};

export default BudgetViewComp;
