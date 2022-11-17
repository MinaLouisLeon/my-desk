import React, { useState } from "react";
import {
  IonAlert,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonPopover,
  IonInput,
  IonButton,
} from "@ionic/react";
import { folder } from "ionicons/icons";
import {
  actionResetDidFolderExist,
  actionAddFolder,
} from "../../../reducers/foldersReducer";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import AddFolderFabBtnComp from "./AddFolderFabBtnComp";
import styled from "styled-components";
const AddFolderButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const MobileFolderViewComp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.foldersReducer.folders);
  const didFolderExist = useSelector(
    (state) => state.foldersReducer.didFolderExist
  );
  const [folderName, setFolderName] = useState("");
  const [addFolderPopoverState, setAddFolderPopoverState] = useState({
    e: undefined,
    isOpen: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actionAddFolder(folderName));
    handleDismiss();
  };
  const handleDismiss = () => {
    setFolderName("");
    setAddFolderPopoverState({
      e: undefined,
      isOpen: false,
    });
  };
  return (
    <>
      <IonAlert
        isOpen={didFolderExist}
        onDidDismiss={() => dispatch(actionResetDidFolderExist())}
        header="Alert"
        message="This Folder Name Exist."
        buttons={["OK"]}
        mode="ios"
      />

      <IonPopover
        isOpen={addFolderPopoverState.isOpen}
        onDidDismiss={() => {
          handleDismiss();
        }}
      >
        <IonContent>
          <form onSubmit={handleSubmit}>
            <IonList>
              <IonItem>
                <IonLabel>Folder Name:</IonLabel>
                <IonInput
                  required
                  type="text"
                  value={folderName}
                  onIonChange={(e) => setFolderName(e.detail.value)}
                />
              </IonItem>
              <AddFolderButtonsDiv className="ma1 mt2">
                <IonButton
                  color="danger"
                  type="button"
                  className="mr2"
                  onClick={() => handleDismiss()}
                >
                  Cancel
                </IonButton>
                <IonButton color="success" type="submit" className="mr2">
                  Add
                </IonButton>
              </AddFolderButtonsDiv>
            </IonList>
          </form>
        </IonContent>
      </IonPopover>

      <IonList>
        {folders &&
          folders.map((folderItem, index) => {
            return (
              <>
                {folderItem.inTrash === false && (
                  <IonItem
                    lines="full"
                    key={folderItem.label}
                    button
                    onClick={() =>
                      history.push(`/Mobile${folderItem.url}/${index}`)
                    }
                  >
                    <IonIcon icon={folder} slot="start" color="warning" />
                    <IonLabel>{folderItem.label}</IonLabel>
                  </IonItem>
                )}
              </>
            );
          })}
      </IonList>
      <AddFolderFabBtnComp
        setAddFolderPopoverState={setAddFolderPopoverState}
      />
    </>
  );
};

export default MobileFolderViewComp;
