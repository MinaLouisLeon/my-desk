import React from 'react'
import { IonButton ,IonIcon} from '@ionic/react'
import {arrowBack} from "ionicons/icons";
import { useHistory } from 'react-router';
const MobileBackBtnComp = () => {
    const history = useHistory();
  return (
    <IonButton slot='start' fill="clear" onClick={() => history.goBack()}>
        <IonIcon slot="icon-only" icon={arrowBack} />
    </IonButton>
  )
}

export default MobileBackBtnComp