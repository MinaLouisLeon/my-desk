import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useRef } from 'react';
import MobileBackBtnComp from '../../components/Mobile/MobileBackBtnComp';
import MobileOptionMenu from '../../components/Mobile/MobileOptionMenu';
import { useParams, useHistory } from 'react-router';
import { trashOutline } from "ionicons/icons";
import { useDispatch } from 'react-redux';
import { actionDeleteFolder } from '../../reducers/foldersReducer';
import MobileFolderContentViewComp from '../../components/Mobile/Folders/MobileFolderContentViewComp';

const MobileFolderContentPage = () => {
  const pageRef = useRef(null);
  const { label, index } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const optionMenuArr = [
    {
      label: "Delete",
      icon: trashOutline,
      iconColor: "danger",
      handler: () => {
        dispatch(actionDeleteFolder({
          folderIndex: index,
          folderName: label
        }));
        history.goBack();
      }
    }
  ];

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar>
          <MobileBackBtnComp />
          <IonTitle>{label}</IonTitle>
          <MobileOptionMenu optionsArr={optionMenuArr} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MobileFolderContentViewComp pageRef={pageRef} label={label} index={index} />
      </IonContent>
    </IonPage>
  )
}

export default MobileFolderContentPage