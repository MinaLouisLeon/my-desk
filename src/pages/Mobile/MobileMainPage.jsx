import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import MobileSideMenu from "../../components/Mobile/MobileSideMenu";
import {ScreenOrientation} from "@awesome-cordova-plugins/screen-orientation";
const MobileMainPage = () => {
  ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  return (
    <IonPage>
      <MobileSideMenu />
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot='start'/>
          <IonTitle>
            My Desk
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen id="mobile-main-page">
       
      </IonContent>
    </IonPage>
    
  )
}

export default MobileMainPage