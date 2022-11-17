import { IonButton, IonIcon, IonItem, IonLabel, IonList, useIonPopover } from '@ionic/react'
import React from 'react'
import { menu } from "ionicons/icons";
const MobileOptionMenu = ({ optionsArr }) => {
    const popover = <IonList className='pa2'>
        {optionsArr && optionsArr.map((optionItem) => {
            return (
                <IonItem key={optionItem.label} button onClick={optionItem.handler}>
                    {optionItem.icon && <IonIcon slot='start' icon={optionItem.icon} color={optionItem.iconColor} />}
                    <IonLabel color={optionItem.iconColor}>{optionItem.label}</IonLabel>
                </IonItem>
            )
        })}
    </IonList>
    const [present, dismiss] = useIonPopover(popover, {
        onDismiss: (data, role) => dismiss(data, role)
    })
    return (
        <>
            <IonButton slot='end' id='mobile-option-menu' fill='clear'
                onClick={(e) => {
                    present({
                        event: e,
                        mode:"ios",
                        dismissOnSelect:true
                    })
                }}
            >
                <IonIcon icon={menu} slot="icon-only" />
            </IonButton>
        </>
    )
}

export default MobileOptionMenu