import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import MobileBackBtnComp from "../../components/Mobile/MobileBackBtnComp";
import MobileFolderViewComp from '../../components/Mobile/Folders/MobileFolderViewComp';
const MobileFoldersPage = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <MobileBackBtnComp />
          <IonTitle>
            Folders
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <MobileFolderViewComp />
      </IonContent>
    </IonPage>
  )
}

export default MobileFoldersPage