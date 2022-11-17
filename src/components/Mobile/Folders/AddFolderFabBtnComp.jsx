import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
const AddFolderFabBtnComp = ({ setAddFolderPopoverState }) => {
  return (
    <IonFab vertical="bottom" horizontal="end">
      <IonFabButton
        color="secondary"
        onClick={(e) => {
          setAddFolderPopoverState({
            e: e.persist(),
            isOpen: true,
          });
        }}
      >
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );
};

export default AddFolderFabBtnComp;
