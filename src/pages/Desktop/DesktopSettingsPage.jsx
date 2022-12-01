import { IonItem, IonLabel, IonList } from "@ionic/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionChangeDesktopSettingsView } from "../../reducers/settingsReducer";
import styled from "styled-components";
import { actionSetBackground } from "../../reducers/desktopModeReducer";
const BackgroudItemsContainer = styled.div`
  /* width: 100%;
  height: 100%; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
`;
const BackgroudItem = styled.div`
  min-width: 100px;
  min-height: 100px;
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.backgroundColor};
  background-image: ${(props) => props.backgroundImage};
`;
const DesktopSettingsPage = () => {
  const dispatch = useDispatch(null);
  const settingsView = useSelector(
    (state) => state.settingsReducer.settingsView
  );
  const desktopBackgrounds = useSelector(
    (state) => state.settingsReducer.desktopBackgrounds
  );
  const BackgroudsComp = () => {
    return (
      <>
        <h2 className="pl2">Select Background:</h2>
        <BackgroudItemsContainer>
          {desktopBackgrounds.map((item) => {
            return (
              <BackgroudItem
                onClick={() =>
                  dispatch(
                    actionSetBackground({
                      backgroundColor: item.backgroundColor,
                      backgroundImage: item.backgroundImage,
                    })
                  )
                }
                className="ma2 br2"
                backgroundColor={item.backgroundColor}
                backgroundImage={item.backgroundImage}
              />
            );
          })}
        </BackgroudItemsContainer>
      </>
    );
  };
  const MainList = () => {
    return (
      <IonList mode="ios">
        <IonItem
          button
          onClick={() => dispatch(actionChangeDesktopSettingsView("backgroud"))}
        >
          <IonLabel>Backgroud</IonLabel>
        </IonItem>
      </IonList>
    );
  };
  const handleMainView = () => {
    switch (settingsView) {
      case "mainList":
        return <MainList />;
      case "backgroud":
        return <BackgroudsComp />;
      default:
        return <MainList />;
    }
  };
  return (
    <>
      {/* settings list */}
      {handleMainView()}
    </>
  );
};

export default DesktopSettingsPage;
