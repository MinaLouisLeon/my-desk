import { IonContent, IonHeader, IonTitle, IonToolbar, IonPage} from '@ionic/react'
import React from 'react';
import MobileBackBtnComp from '../../../components/Mobile/MobileBackBtnComp';
import MobileOptionMenu from '../../../components/Mobile/MobileOptionMenu';
import { useSelector, useDispatch } from 'react-redux';
import { actionDeleteBudget } from '../../../reducers/budgetsReducer';
import {trashOutline} from "ionicons/icons";
import { useHistory } from 'react-router';
import BudgetViewComp from '../../../components/Mobile/Budget/BudgetViewComp';

const MobileBudgetPage = () => {
  const dispatch = useDispatch(null);
  const history = useHistory();
  const selectedBudget = useSelector(state => state.budgetsReducer.selectedBudget[0]);
  
  const optionMenuArr = [
    {
      label : "Delete",
      icon : trashOutline,
      iconColor : "danger",
      handler : () => {
        dispatch(actionDeleteBudget({
          budgetFolder : selectedBudget.budgetFolder,
          budgetName : selectedBudget.budgetName
        }));
        history.goBack();
      }
    }
  ]; 
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <MobileBackBtnComp />
          <IonTitle>{selectedBudget.budgetName}</IonTitle>
          <MobileOptionMenu optionsArr={optionMenuArr} />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <BudgetViewComp 
          selectedBudget={selectedBudget}
        />
      </IonContent>
    </IonPage>
  )
}

export default MobileBudgetPage