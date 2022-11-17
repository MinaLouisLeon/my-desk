import React, { useState } from "react";
import {
  useIonActionSheet,
  IonFab,
  IonFabButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonAlert,
} from "@ionic/react";
import AddBudgetModal from "../Budget/AddBudgetModal";
import {
  actionResetDidBudgetExist,
  actionSetSelectedBudget,
} from "../../../reducers/budgetsReducer";
import { add, card } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
const MobileFolderContentViewComp = ({ pageRef, label, index }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [present] = useIonActionSheet();
  const folderData = useSelector(
    (state) => state.foldersReducer.folders[index].data
  );
  const didBudgetExist = useSelector(
    (state) => state.budgetsReducer.didBudgetExist
  );
  const handleItemView = (item) => {
    switch (item.dataType) {
      case "budget":
        return (
          <IonItem
            button={true}
            key={item.budgetName}
            lines="full"
            onClick={() => {
              dispatch(
                actionSetSelectedBudget({
                  folderName: label,
                  budgetName: item.budgetName,
                })
              );
              history.push(`/Mobile/BudgetPage`);
            }}
          >
            <IonIcon slot="start" color="secondary" icon={card} />
            <IonLabel slot="start">{item.budgetName}</IonLabel>
          </IonItem>
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      <IonAlert
        isOpen={didBudgetExist}
        onDidDismiss={() => dispatch(actionResetDidBudgetExist())}
        header="Alert"
        message="This Budget Name Exist."
        buttons={["OK"]}
        mode="ios"
      />
      <AddBudgetModal
        pageRef={pageRef}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        folderLabel={label}
        folderIndex={index}
      />
      <IonList>
        {folderData &&
          folderData.map((item) => {
            return <>{item.inTrash ? <></> : <>{handleItemView(item)}</>}</>;
          })}
      </IonList>
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton
          color="secondary"
          onClick={() => {
            present({
              mode: "ios",
              buttons: [
                {
                  text: "Add Budget",
                  handler: () => {
                    setIsModalOpen(true);
                  },
                },
                {
                  text: "Cancel",
                  role: "cancel",
                },
              ],
            });
          }}
        >
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>
    </>
  );
};

export default MobileFolderContentViewComp;
