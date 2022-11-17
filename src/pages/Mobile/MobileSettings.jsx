import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import MobileBackBtnComp from '../../components/Mobile/MobileBackBtnComp'
const MobileSettings = () => {
  return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <MobileBackBtnComp />
                <IonTitle>
                    Settings
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen></IonContent>
    </IonPage>
  )
}

export default MobileSettings
