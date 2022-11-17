import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
// import "./App.css";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import MobileMainPage from "./pages/Mobile/MobileMainPage";
import MobileFoldersPage from "./pages/Mobile/MobileFoldersPage";
import MobileSettings from "./pages/Mobile/MobileSettings";
import MobileFolderContentPage from "./pages/Mobile/MobileFolderContentPage";
import MobileBudgetPage from "./pages/Mobile/Budget/MobileBudgetPage";

import DesktopMainPage from "./pages/Desktop/DesktopMainPage";

setupIonicReact();

const App: React.FC = () => {
  const mode = useSelector((state: any) => state.settingsReducer.mode);
  return (
    <IonApp>
      {mode === "mobile" ? (
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/MobileMainPage" />
              </Route>
              <Route path="/MobileMainPage" exact={true}>
                <MobileMainPage />
              </Route>
              <Route path="/Mobile/Folders" exact={true}>
                <MobileFoldersPage />
              </Route>
              <Route exact={true} path="/Mobile/folder/:label/:index">
                <MobileFolderContentPage />
              </Route>
              <Route exact={true} path="/Mobile/BudgetPage">
                <MobileBudgetPage />
              </Route>
              <Route path="/Mobile/Settings" exact={true}>
                <MobileSettings />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      ) : (
        <DesktopMainPage />
      )}
    </IonApp>
  );
};

export default App;
