import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { actionAddBudget } from "../../../reducers/budgetsReducer";
const AddBudgetModal = ({
  pageRef,
  isOpen,
  setIsOpen,
  folderLabel,
  folderIndex,
}) => {
  const modal = useRef(null);
  const dispatch = useDispatch(null);
  const [presentingElement, setPresentingElement] = useState(null);
  const [budgetName, setBudgetName] = useState("");
  const [budgetType, setBudgetType] = useState("normal");
  const [custodyAmount, setCustodyAmount] = useState(null);
  useEffect(() => {
    setPresentingElement(pageRef.current);
    // eslint-disable-next-line
  }, []);
  function dismiss() {
    setBudgetName("");
    setBudgetType("normal");
    setIsOpen(false);
    setCustodyAmount(null);
    modal.current?.dismiss();
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      actionAddBudget({
        budgetFolder: folderLabel,
        folderIndex: folderIndex,
        budgetName: budgetName,
        budgetType: budgetType,
        custodyAmount: custodyAmount,
      })
    );
    dismiss();
  };
  return (
    <>
      <IonModal
        //mode='ios'
        ref={modal}
        presentingElement={presentingElement}
        isOpen={isOpen}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Budget</IonTitle>
            <IonButton
              slot="end"
              color="danger"
              fill="clear"
              onClick={() => dismiss()}
            >
              Cancel
            </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel>Name:</IonLabel>
                <IonInput
                  required
                  type="text"
                  value={budgetName}
                  onIonChange={(e) => setBudgetName(e.detail.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Budget Type:</IonLabel>
                <IonSelect
                  interface="popover"
                  placeholder="Normal"
                  value={budgetType}
                  onIonChange={(e) => setBudgetType(e.detail.value)}
                >
                  <IonSelectOption value="normal">Normal</IonSelectOption>
                  <IonSelectOption value="custody">Custody</IonSelectOption>
                  {/* TODO: show daily budget option */}
                  {/* <IonSelectOption value="daily">Daily</IonSelectOption> */}
                </IonSelect>
              </IonItem>
              {budgetType === "custody" ? (
                <IonItem>
                  <IonLabel>Custody Amount:</IonLabel>
                  <IonInput
                    required
                    type="number"
                    step="0.01"
                    value={custodyAmount}
                    onIonChange={(e) => setCustodyAmount(e.detail.value)}
                  />
                </IonItem>
              ) : (
                <></>
              )}
              <IonButton
                expand="block"
                color="success"
                type="submit"
                className="ma2"
              >
                Add
              </IonButton>
            </form>
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default AddBudgetModal;
