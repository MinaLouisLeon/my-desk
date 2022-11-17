import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { actionSetOperationMode } from '../../reducers/settingsReducer';
const menuList = [
  {
    label : "Folders",
    url : "/Mobile/Folders"
  },{
    label : "Settings",
    url : "/Mobile/Settings"
  }
]


const MobileSideMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch(null);
  return (
    <IonMenu contentId='mobile-main-page'>
        <IonHeader>
            <IonToolbar>
                <IonTitle>
                  Menu
                </IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {menuList.map((item) => {
              return(
                <IonItem lines='full' key={item.label} button onClick={() => history.push(item.url)}>
                  <IonLabel>
                    {item.label}
                  </IonLabel>
                </IonItem>
              )
            })}
            <IonItem lines='full' button onClick={() => {dispatch(actionSetOperationMode("desktop"))}}>
              <IonLabel>Desktop Mode</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
    </IonMenu>
  )
}

export default MobileSideMenu